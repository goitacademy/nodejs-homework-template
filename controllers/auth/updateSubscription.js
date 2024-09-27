const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = ctrlWrapper(updateSubscription);
