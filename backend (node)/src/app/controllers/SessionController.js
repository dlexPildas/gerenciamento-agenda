const jwt = require("jsonwebtoken");
const Yup = require("yup");

const User = require("../models/User");

const authConfig = require("../../config/auth");

class SessionController {
  async store(req, res) {
    /**
     * Data's validations
     */
    const schema = Yup.object().shape({
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

    const { email, password } = req.body;

    console.log(email, password);

    const userExist = await User.findOne({
      where: { email }
    });

    if (!userExist) {
      return res.json({ error: "User not found!" });
    }

    if (!(await userExist.checkPassword(password))) {
      return res.json({ error: "Password does not valid" });
    }

    const { id, name } = userExist;

    return res.json({
      id,
      name,
      email,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

module.exports = new SessionController();
