const { Op } = require("sequelize");

const Yup = require("yup");

const User = require("../models/User");
const Event = require("../models/Event");

class UserController {
  async index(req, res) {
    /**
     * Find all users and your events
     */
    const users = await User.findAll({
      where: { id: { [Op.ne]: req.userId } },

      include: {
        required: true,
        association: "events",
        attributes: ["id"],
        where: { id: 5 }
      }
    });

    return res.json(users);
  }

  async store(req, res) {
    /**
     * Data's validations
     */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: "Validation fails" });
    }

    const userExist = await User.findOne({
      where: { email: req.body.email }
    });

    if (userExist) {
      return res.json({ error: "User already exist!" });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email
    });
  }
}

module.exports = new UserController();
