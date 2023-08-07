const { User } = require("../../models");

const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
require("dotenv").config();
const { BASE_URL } = process.env;
const gravatar = require("gravatar");

const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verifycationCode = nanoid();
  const avatarURL = await gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    verifycationCode,
    password: hashPassword,
    avatarURL,
  });

  const varifyEmail = {
    to: email,
    subject: "Verify Email",
    html: `<a target="_blank" href="${BASE_URL}api/users/verify/${verifycationCode}">Click to verify email</a>`,
  };
  await sendEmail(varifyEmail);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };