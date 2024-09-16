const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const transporter = require("../../helpers/sendEmail");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (email.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    from: "alisaromantsova@meta.ua",
    to: email,
    subject: "Verify email",
    html: `<a target="_blank href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await transporter
    .sendMail(verifyEmail)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error.message));
  res.status(201).json({
    message: "Verification email sent",
  });
};

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };
