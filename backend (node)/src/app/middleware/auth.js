const jwt = require("jsonwebtoken");

const { promisify } = require("util");

const authConfig = require("../../config/auth");

module.exports = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({ error: "Token is not provided" });
  }

  const [, token] = authHeaders.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
  } catch (err) {
    return res.status(401).json({ error: "token does not valid" });
  }

  jwt.verify(token, authConfig.secret);

  next();
};
