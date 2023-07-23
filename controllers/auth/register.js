const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { HttpError, ctrlWrapper } = require("../../helpers");
const transporter = require("../../helpers/sendEmail");
require("dotenv").config();

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email have already been used");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
  const verifyEmail = {
    from: "alisaromantsova@meta.ua",
    to: email,
    subject: "Verify email",
    html: `<a target="_blank href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await transporter
    .sendMail(verifyEmail)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error.message));
  res.status(201).json({
    email: newUser.email,
  });
};
module.exports = {
  register: ctrlWrapper(register),
};
