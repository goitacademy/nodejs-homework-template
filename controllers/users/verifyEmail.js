const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    res.status(400),
      json({
        status: 400,
        message: "not found verification token",
      });
    throw NotFound();
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).json({
    status: 200,
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
