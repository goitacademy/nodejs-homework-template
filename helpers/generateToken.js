const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const payload = { _id: userId };
  const options = { expiresIn: process.env.JWT_EXPIRE };

  const token = jwt.sign(payload, process.env.SECRET_KEY, options);
  return token;
};

module.exports = generateToken;
