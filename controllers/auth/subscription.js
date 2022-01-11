const { User } = require("../../models");
const { BadRequest } = require("http-errors");

const subscriptionUpdate = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(_id, { subscription }, { new: true });

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = subscriptionUpdate;
