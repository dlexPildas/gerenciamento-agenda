const { startOfDay, parseISO, isBefore } = require("date-fns");

const User = require("../models/User");

const Event = require("../models/Event");

class EventController {
  async store(req, res) {
    const userExist = await User.findByPk(req.userId);

    const { name, description, date_event, place, category } = req.body;

    if (!userExist) {
      return res.status(401).json({ error: "User does not exist" });
    }

    /**
     * convert date_event and verify if date_event is past
     */
    const dateStart = startOfDay(parseISO(date_event));
    if (isBefore(dateStart, new Date())) {
      return res.status(401).json({ error: "Date is past" });
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
}

module.exports = new EventController();
