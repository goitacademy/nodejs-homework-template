const { User } = require("../../models/user");
require("dotenv").config();

const { HttpError, ctrlWrapper } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  const { id } = req.user;
  const body = req.body;

  if (!body) {
    throw HttpError(400, "Missing field subscription");
  }

  const result = await User.findByIdAndUpdate(id, body, {
    new: req.body.subscription,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription),
};
