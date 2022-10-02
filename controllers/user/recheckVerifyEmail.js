const { User } = require("../../models");

const recheckVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { _id, verify } = await User.findOne({ email });

  if (verify) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Verification has already been passed.",
    });
  }

  await User.findByIdAndUpdate(_id, { verify: true, verificationToken: null });

  res.json({
    status: "succes",
    code: 200,
    message: "Verification email sent.",
  });
};

module.exports = recheckVerifyEmail;
