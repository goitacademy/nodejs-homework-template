const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(404, "Email is already verified");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({
    message: "Email verified successfully",
  });
};

module.exports = {
  verifyEmail: ctrlWrapper(verifyEmail),
};
