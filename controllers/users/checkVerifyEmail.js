const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { v4 } = require("uuid");
const checkVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { verify } = await User.findOne({ email });
  const verificationToken = v4();
  if (verify) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Verification has already been passed",
    });
  }

  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Press to confirm email</a>`,
  };

  await sendEmail(mail);

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = checkVerifyEmail;
