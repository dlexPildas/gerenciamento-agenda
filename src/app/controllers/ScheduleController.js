const Yup = require("yup");

const Schedule = require("../models/Schedule");
const User = require("../models/User");

class ScheduleController {
  async store(req, res) {
    /**
     * Data's validations
     */
    const schema = Yup.object().shape({
      user_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: "Validation fails" });
    }

    const { user_id } = req.body;

    const userExist = await User.findByPk(user_id);

    if (!userExist) {
      return res.status(401).json({ error: "User does not found" });
    }

    const schedule = await Schedule.create({
      user_id
    });

    return res.json(schedule);
  }
}

module.exports = new ScheduleController();
