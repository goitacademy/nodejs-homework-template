const { User } = require("../../models");

const current = async (req, res) => {
  const { token, email, subscription, _id } = req.user;
  console.log(req.user);
  await User.findOne({ token });

  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
      _id,
    },
  });
};

module.exports = current;
