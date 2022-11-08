const { NotFound } = require("http-errors");
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;

  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!result) {
    throw new NotFound("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = updateSubscription;
