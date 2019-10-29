const UserEvent = require("../models/UserEvent");
const User = require("../models/User");
const Event = require("../models/Event");

class UserEventController {
  async store(req, res) {
    const { user_id, event_id } = req.body;

    /**
     * check if the user logged is owner of the event
     */
    const eventExist = await Event.findOne({
      where: { id: event_id, owner: req.userId }
    });
    if (!eventExist) {
      return res.status(401).json({ error: "Event does not found" });
    }

    /**
     * Check if the user logged is equal to user_id
     */
    if (req.userId === user_id) {
      return res.status(401).json({ error: "You already belongsto event" });
    }

    /**
     * check if the user that will be add to event exist
     */
    const userExist = await User.findByPk(user_id);
    if (!userExist) {
      return res.status(401).json({ error: "User does not found" });
    }

    /**
     * check if the user already was add to event
     */
    const userEventExist = await UserEvent.findOne({
      where: { id: 1 }
    });
    if (!userEventExist) {
      return res.status(401).json({ error: "User already was add to event" });
    }

    /**
     * Add the user to event
     */
    // const userEvent = await UserEvent.create({
    //   user_id: user_id,
    //   event_id: event_id
    // });

    return res.json({ a: userExist.id, b: eventExist.id });
  }
}

module.exports = new UserEventController();
