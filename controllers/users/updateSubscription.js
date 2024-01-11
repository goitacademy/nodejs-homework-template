const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!updatedUser) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(updatedUser);
};

module.exports = updateUserSubscription;
