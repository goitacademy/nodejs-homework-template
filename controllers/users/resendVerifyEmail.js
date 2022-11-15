const { User } = require("../../models");

const { RequestError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw RequestError(404, `User with email # ${email} # not found`);
  }

  if (user.verify) {
    throw RequestError(
      400,
      `User with email ${email} has already been verified`
    );
  }

  const mail = {
    to: email,
    subject: "Email confirming",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email </a>`,
  };

  await sendEmail(mail);

  res.status(200).json({ message: "Verification email was resent" });
};

module.exports = resendVerifyEmail;
