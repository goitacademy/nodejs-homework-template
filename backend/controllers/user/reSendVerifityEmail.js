const HttpError = require("../../helpers/httpError");
const msg = require("../../helpers/sendEmail");
const { User } = require("../../models/userModel");

const reSendVerifyEmail = async (req, res) => {
  const { DB_URI } = process.env;
  const { email } = req.body;
  
if (!email)
res.status(400).json({ message: "missing required field email" });


const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(
      401,
      'User no registred!!'
    );
  }

  if (user.verify) {
    res.status(400).json({ message: 'Verification has already been passed' });
  }

    const sendVerifityEmail = {
    from: 'vocer.2017@gmail.com',
    to: email,
    subject: "Your verifity email",
    html: `<a target="_blank" href="${DB_URI}/api/users/verify/${user.verificationToken}">Click here for verify your email</a>`
  }
  await msg(sendVerifityEmail)

  res
    .status(201)
    .json({ message: "Verification email sent" });
};

module.exports = reSendVerifyEmail;