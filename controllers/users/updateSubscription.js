const User = require("../../models/user.js");
const {HttpError} = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(id, req.body);
  if (!updatedUser) {
    throw new HttpError(404, "Not found");
  }
  return res.status(200).json(updatedUser);
};

module.exports = updateSubscription;
