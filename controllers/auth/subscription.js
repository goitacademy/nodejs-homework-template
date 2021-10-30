const { User } = require("../../models");

const subscription = async (req, res) => {
  const { token } = req.user;
  const { subscription } = req.body;
  const { email } = await User.findOneAndUpdate(
    { token },
    { subscription },
    { new: true }
  );
  res.json({
    data: {
      email,
      subscription,
    },
  });
};

module.exports = subscription;
