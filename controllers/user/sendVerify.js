const { HttpError } = require("../../helpers");
const sendMail = require("../../middlewares/sendMail");
const User = require("../../models/user");

async function sendVerify(req, res, next) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const verificationToken = user.verificationToken;

  if (!user) {
    throw HttpError(400, "missing required field email");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  if (!user.verify) {
    await sendMail({
      to: email,
      subject: "Please confirm your email",
      html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}'>Confirm your email</a>`,
    });
    console.log("verify :", user.verify);
  }

  return res.status(200).json("Verification email sent");
}

module.exports = sendVerify;
