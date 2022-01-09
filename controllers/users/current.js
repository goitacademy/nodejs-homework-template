const { User } = require("../../models");

const current = async (req, res) => {
  const { token, email, subscription } = req.user;
  await User.findOne({ token });

  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = current;
