const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../../utils');

const { User } = require('../../models');
const { httpError } = require('../../utils');

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken: uuidv4(),
  });

  sendEmail(
    newUser.email,
    `Please visit link to verify your email http://localhost:3000/api/users/verify/${newUser.verificationToken}`
  );

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signUp;
