const User = require("../../models/userModel");
const { AppError } = require("../../utils");

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    return next(new AppError(404, "User not found with verification token"));
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verifyEmail;