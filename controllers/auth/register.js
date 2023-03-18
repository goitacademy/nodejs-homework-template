const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { User } = require('../../models/user');
const { HttpError, sendEmail } = require('../../helpers');
require('dotenv').config();

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  console.log(verificationToken);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
  const verifyEmail = {
    to: email,
    subject: 'verification',
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" >click to verify</a>`,
  };
  await sendEmail(verifyEmail);
  res.status(201).json({
    user: { email: newUser.email, avatarURL: newUser.avatarURL },
  });
};

module.exports = register;
