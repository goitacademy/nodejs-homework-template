const { User } = require("../../models/user");

const current = async (req, res) => {
  const { email } = req.body;
  const { _id } = req.user;
  await User.currentUser(_id);
  res.json({
    email,
    subscription: "starter",
  });
};

module.exports = current;
