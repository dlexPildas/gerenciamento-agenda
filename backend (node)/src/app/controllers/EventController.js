const {
  startOfDay,
  endOfDay,
  isAfter,
  parseISO,
  isBefore,
  addDays,
  startOfMinute,
  endOfMinute
} = require("date-fns");

const Yup = require("yup");
const { Op } = require("sequelize");
const User = require("../models/User");

const Event = require("../models/Event");

class EventController {
  async index(req, res) {
    const { date_filter, text_filter } = req.headers;
    const { all } = req.params;

    /**
     * check if thehe is a filter and find to events
     */

    if (text_filter) {
      const event = await Event.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: "%" + text_filter + "%" } },
            { description: { [Op.iLike]: "%" + text_filter + "%" } },
            { place: { [Op.iLike]: "%" + text_filter + "%" } }
          ]
        },
        include: {
          required: false,
          association: "users",
          where: { id: req.userId }
        }
      });

      return res.json(event);
    }

    if (date_filter) {
      /**
       * convert date_event and verify if date_event is past
       */
      const dateStart = startOfMinute(parseISO(date_filter));

      if (isBefore(addDays(dateStart, 1), new Date())) {
        return res.json({ error: "Date is past" });
      }

      const event = await Event.findAll({
        where: {
          date_event: {
            [Op.between]: [startOfDay(dateStart), endOfDay(dateStart)]
          }
        },
        include: {
          required: false,
          association: "users",
          where: { id: req.userId }
        }
      });

      return res.json(event);
    }

    /**
     * check if shall show all events
     */
    if (all) {
      const event = await Event.findAll({
        include: {
          required: false,
          association: "users",
          where: { id: req.userId }
        }
      });

      return res.json(event);
    }

    const events = await Event.findAll({
      where: { owner: req.userId },
      include: {
        association: "user_owner"
      }
    });
    const user = await User.findByPk(req.userId, {
      include: {
        association: "events"
      }
    });

    return res.json({
      user,
      events
    });
  }

  async show(req, res) {
    const { id, name } = req.params;

    /**
     * Data's validations
     */
    const schema = Yup.object().shape({
      id: Yup.number().required()
    });

    if (!(await schema.isValid(req.params))) {
      return res.json({ error: "Validation fails" });
    }

    const event = await Event.findOne({
      where: { id },
      include: {
        association: "users"
      }
    });

    if (!event) {
      return res.json({ error: "Event does not found" });
    }

    return res.json(event);
  }

  async store(req, res) {
    /**
     * Data's validations
     */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      date_event: Yup.date().required(),
      date_event_final: Yup.date().required(),
      place: Yup.string().required(),
      category: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: "Validation fails" });
    }

    const userExist = await User.findByPk(req.userId);

    const {
      name,
      description,
      date_event,
      date_event_final,
      place,
      category
    } = req.body;

    if (!userExist) {
      return res.json({ error: "User does not exist" });
    }

    const dateStart = startOfMinute(parseISO(date_event));
    const dateFinal = startOfMinute(parseISO(date_event_final));

    if (isAfter(dateStart, dateFinal)) {
      return res.json({ error: "Initial date is after than final date" });
    }
    if (isBefore(dateStart, new Date())) {
      return res.json({ error: "Date is past" });
    }

    /**
     * find to event and verify if exist
     */
    const eventExist = await Event.findAll({
      where: {
        owner: req.userId,
        category: "exclusivo",
        date_event: {
          [Op.between]: [
            startOfDay(parseISO(date_event)),
            endOfDay(parseISO(date_event))
          ]
        }
      }
    });

    if (eventExist && category === "exclusivo") {
      let error = false;
      eventExist.map(async event => {
        if (isBefore(dateStart, event.date_event)) {
          if (!isBefore(dateFinal, event.date_event)) {
            error = true;
          }
        } else if (!isAfter(dateStart, event.date_event_final)) {
          error = true;
        }
      });

      if (error) {
        return res.json({
          error: "Already exist a event to this date and hour"
        });
      }
    }

    const event = await Event.create({
      name,
      description,
      date_event: dateStart,
      date_event_final: dateFinal,
      place,
      category,
      owner: req.userId
    });

    return res.json(event);
  }

  async update(req, res) {
    /**
     * Data's validations
     */
    const schema = Yup.object().shape({
      event_id: Yup.number().required(),
      name: Yup.string(),
      description: Yup.string(),
      date_event: Yup.date(),
      date_event_final: Yup.date(),
      place: Yup.string(),
      category: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: "Validation fails" });
    }

    const { event_id } = req.body;

    const event = await Event.findByPk(event_id);

    if (!event) {
      return res.json({ error: "Event does not found" });
    }

    if (event.owner !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to update this event" });
    }

    /**
     * convert date_event and verify if date_event is past
     */
    const dateStart = startOfMinute(parseISO(req.body.date_event));
    const dateFinal = startOfMinute(parseISO(req.body.date_event_final));

    if (isAfter(dateStart, dateFinal)) {
      return res.json({ error: "Initial date is after than final date" });
    }
    if (isBefore(dateStart, new Date())) {
      return res.json({ error: "Date is past" });
    }

    /**
     * find to event and verify if exist
     */
    const eventExist = await Event.findAll({
      where: {
        owner: req.userId,
        id: { [Op.ne]: event_id },
        category: "exclusivo",
        date_event: {
          [Op.between]: [
            startOfDay(parseISO(req.body.date_event)),
            endOfDay(parseISO(req.body.date_event))
          ]
        }
      }
    });

    if (eventExist && req.body.category === "exclusivo") {
      let error = false;
      eventExist.map(async event => {
        if (isBefore(dateStart, event.date_event)) {
          if (!isBefore(dateFinal, event.date_event)) {
            error = true;
          }
        } else if (!isAfter(dateStart, event.date_event_final)) {
          error = true;
        }
      });

      if (error) {
        return res.json({
          error: "Already exist a event to this date and hour"
        });
      }
    }

    await event.update(req.body);

    return res.json(event);
  }

  async delete(req, res) {
    /**
     * Data's validations
     */

    const schema = Yup.object().shape({
      event_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.headers))) {
      return res.json({ error: "Validation fails" });
    }

    const user = await User.findByPk(req.userId);

    const { event_id } = req.headers;

    const event = await Event.findByPk(event_id);

    if (!event) {
      return res.json({ error: "Event does not found" });
    }

    if (event.owner !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to update this event" });
    }

    await user.removeEvent(event);

    await Event.destroy({
      where: { id: event_id }
    });

    return res.json({ message: "Event deleted sucess" });
  }
}

module.exports = new EventController();
