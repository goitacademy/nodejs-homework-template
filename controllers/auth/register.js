const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require('nanoid');
require("dotenv").config();

const { sendEmail } = require("../../services");
const { User } = require("../../models");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
const avatarURL = gravatar.url(email);

const verificationToken = nanoid();

  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);
  newUser.save();

  const verifyEmail = {
    to: email,
    subject: "Please verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201);
  res.json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        subscription: "starter",
      },
    },
  });
};

module.exports = register;