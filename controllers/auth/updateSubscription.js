const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const updateUser = await User.findByIdAndUpdate(
    _id,
    { subscription: req.body.subscription },
    { new: true }
  );
  if (!updateUser) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      name: updateUser.name,
      email: updateUser.email,
      subscription: updateUser.subscription,
    },
  });
};

module.exports = ctrlWrapper(updateSubscription);
