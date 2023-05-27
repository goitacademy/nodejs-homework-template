const { HttpError } = require("../../helpers");
const User = require("../../models/user");

async function verifyEmail(req, res, next) {
  const { token } = req.params;
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw HttpError(404, "Not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  return res.status(200).json("Verification successful");
}

module.exports = verifyEmail;
