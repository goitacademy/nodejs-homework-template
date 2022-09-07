// const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const current = async (req, res) => {
  const { token, email, subscription } = req.user;
  if (!token) {
    throw RequestError(401, "Not authorized");
  }
  res.status(200).json({
    email: email,
    subscription: subscription,
  });
};

module.exports = current;
