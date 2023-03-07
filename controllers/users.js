const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ code: 200, data: { result } });
};

module.exports = { updateSubscription: ctrlWrapper(updateSubscription) };
