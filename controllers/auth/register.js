const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendEmail = require("../../helpers/sendEmail");

const User = require("../../models/users");

const HttpError = require("../../helpers/HttpError");

const {BASE_URL} = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${ verificationToken}">Click verify email</a>`,
  };

  try {
    await sendEmail(verifyEmail); // Sending the verification email
  } catch (error) {
    // Handling email sending error
    console.error("Error sending verification email:", error);
    throw new HttpError(500, "Failed to send verification email");
  }
  
  res.status(201);
  res.json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
