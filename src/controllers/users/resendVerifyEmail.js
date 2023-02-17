const { User } = require("../../models");
// const { randomUUID } = require("crypto");
// const { RequestError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (res, req) => {

  const { email } = req.body;
  // const user = await User.findOne({ email });
  const { _id, verify } = await User.findOne({ email });

  if (verify) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Verification has already been passed.",
    });
  }

  // if (user.verify) {
  //   throw RequestError(400, "User already verify");
  // }
// const verificationToken = randomUUID();
  await User.findByIdAndUpdate(_id, { verify: true, verificationToken: "" });

  // const verifySendMail = {
  //   to: email,
  //   subject: "Confirmation email registration",
  //   html: `<a href ="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click to confirm of email</a>"`,
  // };

  // await sendEmail(verifySendMail);
  // res.json({
  //   message: "Email verify resend successful",
  // });
  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent.",
  });
};

module.exports = resendVerifyEmail;
