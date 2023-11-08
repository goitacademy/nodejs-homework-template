const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const User = require('../../models/user');
const { ctrlWrapper, HttpError, sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, 'Email is in use');

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });

  const verificationEmail = {
    to: email,
    subject: 'Email verification',
    text: 'verification',
    html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Verify email</a>`,
  };

  await sendEmail(verificationEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = { register: ctrlWrapper(register) };
