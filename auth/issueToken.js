const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const issueToken = async (user) => {
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, jwtSecret);
  user.token = token;
  await user.save();
  return token;
};


module.exports = issueToken;
