const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { HttpError, sendEmail } = require("../../helpers");

const { User } = require("../../models/user");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { d: "identicon" });
  const verificationToken = nanoid();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const verifyEmail = {
    
    to: email,
    subject: "Verify email",
    html: `<div><a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a><a target="_blank" href="localhost:5000//api/auth/verify/${verificationToken}">"http://${BASE_URL}/api/auth/verify/${verificationToken}"</a></div>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = register;
