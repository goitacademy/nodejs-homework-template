const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { User } = require('../../models/userModel');
const HttpError = require('../../helpers/httpError');
const asyncHandler = require("express-async-handler");
const uuid = require('uuid');
const msg = require('../../helpers/sendEmail');

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, 'Email already in use');

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email)
  const verificationToken = uuid();
  const { DB_URI } = process.env 


  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
    verificationToken
  });

  const sendVerifityEmail = {
    from: 'vocer.2017@gmail.com',
    to: email,
    subject: "Your verifity email",
    html: `<a target="_blank" href="${DB_URI}/api/users/verify/${verificationToken}">Click here for verify your email</a>`
  }
  await msg(sendVerifityEmail)
  

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatar: avatarUrl,
      verificationToken
    },
  });
});

module.exports = register;