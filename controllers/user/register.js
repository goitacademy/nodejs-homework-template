const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
require("dotenv").config();
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { sendEmail } = require("../../middlewares");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });

  if (findUser) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify Email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = register;
