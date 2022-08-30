const { User } = require("../../models/user");

const current = async (req, res) => {
  const { email } = req.body;
  const { _id } = req.user;
  // await User.findOne({ _id });
  const user = await User.findOne({ _id });
  if (!user) {
    throw RequestError(401, "Not authorized");
  }
  res.json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = current;
