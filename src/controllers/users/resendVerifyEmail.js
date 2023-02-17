const { User } = require("../../models");
const { randomUUID } = require("crypto");
const { RequestError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (res, req) => {

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "User not found");
  }

  if (user.verify) {
    throw RequestError(400, "User already verify");
  }
const verificationToken = randomUUID();
  await User.findByIdAndUpdate(user._id, { verificationToken });

  const verifySendMail = {
    to: email,
    subject: "Confirmation email registration",
    html: `<a href ="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click to confirm of email</a>"`,
  };

  await sendEmail(verifySendMail);
  res.json({
    message: "Email verify resend successful",
  });
};

module.exports = resendVerifyEmail;
