const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found.",
    });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    status: "succes",
    code: 200,
    message: "Verification successful.",
  });
};

module.exports = verifyEmail;
