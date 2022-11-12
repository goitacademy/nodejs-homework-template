const { User } = require("../../models/user");
const { sendEmail, requestError } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(404, "Not found");
  }
  if (user.verify) {
    throw requestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "",
    html: `<a href = "http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank>Click to confirm </a>`,
  };
  await sendEmail(mail);
  res.status(200).json({
    message: "Verification email sent",
  });
};
module.exports = resendVerifyEmail;
