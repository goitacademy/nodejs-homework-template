const { Unauthorized } = require("http-errors");

const { User } = require("../../model");

const currentUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id, "email subscription");
  if (!user) {
    throw new Unauthorized("Not authorized");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user,
    },
  });
};

module.exports = currentUser;
