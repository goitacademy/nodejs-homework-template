const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { subscription, _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    { ...req.body },
    { new: true }
  );

  if (subscription === req.body.subscription) {
    res.json({
      status: "succes",
      code: 200,
      message: `your subscription is already equal to - '${req.body.subscription}'`,
    });
  }

  res.json({
    status: "succes",
    code: 200,
    user,
  });
};

module.exports = updateSubscription;
