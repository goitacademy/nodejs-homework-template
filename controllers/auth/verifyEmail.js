const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw NotFound();
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verification email sent",
  });
};

module.exports = verifyEmail;
