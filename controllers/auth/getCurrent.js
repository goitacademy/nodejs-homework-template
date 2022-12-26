const User = require("../../models/auth");

const getCurrent = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  res.status(200).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = getCurrent;
