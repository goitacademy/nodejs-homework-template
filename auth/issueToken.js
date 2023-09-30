const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const issueToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, jwtSecret);
  return token;
};

module.exports = issueToken;
