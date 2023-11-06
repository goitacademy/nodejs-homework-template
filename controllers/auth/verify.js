const { ctrlWrapper } = require("../../decorators");

const { HttpError } = require("../../helpers");

const { User } = require("../../models/User");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = ctrlWrapper(verify);
