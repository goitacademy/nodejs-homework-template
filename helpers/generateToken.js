const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId) => {
  const payload = { _id: userId };
  const options = { expiresIn: "1h" };

  const token = jwt.sign(payload, process.env.SECRET_KEY, options);
  return token;
};

module.exports = generateToken;
