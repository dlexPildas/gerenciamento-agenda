const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authConfig = require("../../config/auth");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const userExist = await User.findOne({
      where: { email }
    });

    if (!userExist) {
      return res.status(401).json({ error: "User not found!" });
    }

    if (!(await userExist.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not valid" });
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
