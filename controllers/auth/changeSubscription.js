const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const changeSubscription = async (req, res, next) => {
  const { id, email } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json({ id, email, subscription });
};

module.exports = changeSubscription;