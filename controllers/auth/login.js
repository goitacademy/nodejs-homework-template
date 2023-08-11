const User = require("../../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { HttpError, sendgridEmail } = require("../../helpers");

require("dotenv").config();
const { SECRET_KEY, BASE_URL } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    const verifyEmail = {
      to: email,
      subject: "Confirmation of registration.",
      html: `<p>Hello, follow the link to confirm your registration. </p>
<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
    };
    sendgridEmail(verifyEmail);
    throw HttpError(401, "Email not verified, message resent");
  }
  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      avatarUrl: user.avatarUrl,
      avatarPublickId: user.avatarPublickId,
      avatarLink: user.avatarLink,
      subscription: user.subscription,
    },
  });
};
module.exports = login;
