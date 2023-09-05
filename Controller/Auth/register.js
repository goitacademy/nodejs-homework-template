const { User } = require("../../models/user");
const { HttpError } = require("../../Utilities");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const nodemailer = require("nodemailer");
require('dotenv').config();


const crypto = require("crypto");
const { error } = require("console");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomBytes(16).toString("hex");
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const verifyEmail = {
    to: "dirtyrider277@gmail.com",
    from: "dirtyrider277@gmail.com",
    subject: "Вітаю з реєстрацією!",
    html: `<a target ="_blank" href="${process.env.BASE_URL}/api/users/verify/${verificationToken}" style="color: red;">Натисніть сюди, щоб підвердити адресу своєї електронної скриньки</a>`,
    text: "Натисніть сюди, щоб підвердити адресу своєї електронної скриньки",
  };

  transport
    .sendMail(verifyEmail)
    .then((response) => console.log(response))
    .catch((error) => console.error(error));

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
