const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { RequestError } = require('../../helpers');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { createVerifyEmail, sendEmailWithSendGrid } = require('../../service');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(401, 'Email in use');
  }
  // hashedPassword
  //   const hashedPassword = await bcrypt.hash(password, 10);
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(password, salt);
  /** create default avatar */
  const avatarUrl = gravatar.url(email);

  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });

  const letter = createVerifyEmail(email, verificationToken);

  await sendEmailWithSendGrid(letter);

  res.status(201).json({
    subscription: result.subscription,
    email: result.email,
    avatarUrl: avatarUrl,
  });
};

module.exports = register;
