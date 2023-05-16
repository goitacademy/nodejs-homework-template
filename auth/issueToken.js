const jwt = require("jsonwebtoken");

const jwtSecret = "nick";

const issueToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, jwtSecret);
  return token;
};

module.exports = issueToken;
