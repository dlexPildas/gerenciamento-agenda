const { startOfDay, parseISO, isBefore } = require("date-fns");
const Yup = require("yup");
const { Op } = require("sequelize");
const User = require("../models/User");

const Event = require("../models/Event");

class EventController {
  async index(req, res) {
    const { all } = req.params;

    /**
     * check if shall show all events
     */
    if (all) {
      const event = await Event.findAll({
        where: { owner: { [Op.ne]: req.userId } },
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
      place: Yup.string().required(),
      category: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: "Validation fails" });
    }

    const userExist = await User.findByPk(req.userId);

    const { name, description, date_event, place, category } = req.body;

    if (!userExist) {
      return res.json({ error: "User does not exist" });
    }

    /**
     * convert date_event and verify if date_event is past
     */
    const dateStart = startOfDay(parseISO(date_event));
    if (isBefore(dateStart, new Date())) {
      return res.json({ error: "Date is past" });
    }

    /**
     * find to event and verify if exist
     */
    const eventExist = await Event.findOne({
      where: { owner: req.userId, date_event: dateStart }
    });

    if (eventExist) {
      return res
        .status(401)
        .json({ error: "Already exist a event to this date" });
    }

    const event = await Event.create({
      name,
      description,
      date_event: dateStart,
      place,
      category,
      owner: req.userId
    });

    return res.json(event);
  }

  async update(req, res) {
    console.log(req.body);

    /**
     * Data's validations
     */
    const schema = Yup.object().shape({
      event_id: Yup.number().required(),
      name: Yup.string(),
      description: Yup.string(),
      date_event: Yup.date(),
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
