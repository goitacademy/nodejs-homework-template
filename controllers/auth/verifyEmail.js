const createError = require("http-errors");
const { authServices } = require("../../services");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await authServices.getByVerifyToken({ verificationToken });
  if (!user) throw createError(404, "User not found");
  await authServices.verifyEmail(user._id);

  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
