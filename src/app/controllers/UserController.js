const Yup = require("yup");

const User = require("../models/User");

class UserController {
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
      return res.status(401).json({ error: "Validation fails" });
    }

    const userExist = await User.findOne({
      where: { email: req.body.email }
    });

    if (userExist) {
      return res.status(401).json({ error: "User already exist!" });
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
