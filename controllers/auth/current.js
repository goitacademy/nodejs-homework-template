const { User } = require("../../models");

const current = async (req, res) => {
  const { token } = req.user;
  const { email, subscription } = await User.findOne({ token });
  res.json({
    data: {
      email,
      subscription,
    },
  });
};

module.exports = current;
