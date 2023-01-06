const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!user) {
    throw HttpError(404, `User with id=${_id} not found`);
  }

  res.json({
    status: "Success",
    code: 200,
    message: "Subscription update",
    data: {
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = updateSubscription;
