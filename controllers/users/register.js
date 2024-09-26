const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
// npm i gravatar  для тимчасової аватарки юзеру

const { User } = require("../../models");
const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");
const BASE_URL = process.env.BASE_URL;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  // хешуємо пароль npm i bcryptjs
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken
  });

 const verifyEmail = {
    to: email,  
    subject: "verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`
};

await sendEmail(verifyEmail);

  return res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
