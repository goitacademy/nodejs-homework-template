const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models");
const { nanoid } = require("nanoid");
const { sendMail } = require("../../helpers");

const userDir = path.join(__dirname, "../../public/avatars");

const register = async (req, res) => {
  const avatarURL = gravatar.url("dima@gmail.com");

  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email = ${email} allready exist`);
  }
  const verificationToken = nanoid();
  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Подтвердите регистрацию",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}">Нажмите сюда для подтверждения email </a>`,
  };
  await sendMail(mail);

  const userFolder = path.join(userDir, String(newUser._id));
  await fs.mkdir(userFolder);

  res.status(201).json({
    status: "success",
    code: 201,
    result: "Register success",
  });
};
module.exports = { register };
