const { User } = require("../../models/user/user");

const { HttpError } = require("../../helpers");

const verifyEmail = async (req, res, next) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: null,
  });

  res.json({
    message: "Email has been successfully verified",
  });
};

module.exports = {
  verifyEmail,
};
