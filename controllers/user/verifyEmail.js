const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(401, "Email not found");
  }

  user.verify = true;
  user.verificationCode = "";

  await user.save();

  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
