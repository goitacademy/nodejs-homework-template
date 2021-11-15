const { Unauthorized } = require("http-errors");

const { User } = require("../../model");

const currentUser = async (req, res) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }
  const { email, subscription } = req.user;
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = currentUser;
