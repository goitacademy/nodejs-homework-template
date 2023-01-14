const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    ResponseBody: {
      message: "Verification successful",
    },
  });
};

module.exports = verifyEmail;
