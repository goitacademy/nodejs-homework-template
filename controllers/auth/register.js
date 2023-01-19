const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const {nanoid} = require('nanoid');

const { User } = require('../../models/user');

const { HttpError, sendEmail } = require('../../helpers');

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

  const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});

  const verifyEmail = {
    to: email,
    subject: 'Verify your email',
    html: `<a traget="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify your email</a>`
  }

  await sendEmail(verifyEmail);
  
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL,
  });
}

module.exports = register;