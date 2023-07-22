const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "Email not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200);
  res.json({
    code: 200,
    message: "Verification successful",
  });
};
module.exports = verifyEmail;
