const { ctrlWrapper } = require("../../utils");

const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `User with ${id} not found`);
  }
  res.json(result);
};

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription),
};
