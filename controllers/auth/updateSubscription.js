const { User } = require("../../models/User");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = ctrlWrapper(updateSubscription);
