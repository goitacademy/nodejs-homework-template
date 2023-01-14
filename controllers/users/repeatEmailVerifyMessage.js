const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const repeatEmailVerifyMessage = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user.verify) {
    const error = new Error("Verification has already been passed");
    error.status = 400;
    throw error;
  }
  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<p>We have sent you a re-verification email <a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm email</a></p>`,
  };

  await sendEmail(mail);

  res.status(200).json({
    ResponseBody: {
      email: email,
    },
  });
};

module.exports = repeatEmailVerifyMessage;
