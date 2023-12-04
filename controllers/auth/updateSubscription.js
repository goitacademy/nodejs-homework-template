const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { subscription = "starter" } = req.body;
  const { _id } = req.user;
  const data = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription),
};
