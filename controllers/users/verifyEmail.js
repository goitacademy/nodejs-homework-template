const { User } = require("../../models");
const createError = require("http-errors");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verifyToken: verificationToken });
  if (!user) {
    throw createError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
  res.status(200).json({
    status: "succes",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
