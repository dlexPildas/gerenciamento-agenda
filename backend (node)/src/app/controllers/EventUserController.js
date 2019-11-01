const Yup = require("yup");

const User = require("../models/User");
const Event = require("../models/Event");

class EventUserController {
  async store(req, res) {
    /**
     * Data's validations
     */
    const schema = Yup.object().shape({
      event_id: Yup.number().required(),
      user_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: "Validation fails" });
    }

    const { user_id, event_id } = req.body;

    /**
     * check if the event exist and if user logged is owner of the event
     */
    const eventExist = await Event.findOne({
      where: { id: event_id }
    });

    if (!eventExist) {
      return res.json({ error: "Event does not found" });
    }

    // if (eventExist.owner !== req.userId) {
    //   return res.json({
    //     error: "You don't have permission to add users to this event"
    //   });
    // }

    /**
     * Check if the user logged is equal to user_id
     */
    if (eventExist.owner === user_id) {
      return res.json({ error: "You already belongsto event" });
    }

    /**
     * check if the user that will be add to event exist
     */
    const userExist = await User.findByPk(user_id);

    if (!userExist) {
      return res.json({ error: "User does not found" });
    }

    await userExist.addEvents(eventExist);

    return res.json(userExist);
  }
}

module.exports = new EventUserController();
