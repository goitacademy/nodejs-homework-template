const { User } = require("../../models");
const { NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound();
  }
  if (user.verify) {
    throw NotFound(`User alredy verify`);
  }

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target ="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

  res.status(200).json({
    status: 200,
    message: "Verification successful",
  });
};
module.exports = resendVerifyEmail;
