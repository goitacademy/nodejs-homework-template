const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const {
  userModel: { User },
} = require("../../models");
const gravatar = require("gravatar");
const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email is already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { d: "monsterid" });

  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201);
  res.json({ email: newUser.email, name: newUser.name });
};

module.exports = registerUser;
