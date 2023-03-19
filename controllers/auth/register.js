const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL, verificationToken });
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
  });
  const sendMail = {
    to: email,
    from: "mixaluch11@i.ua",
    subject: "Підтвердження email",
    // html: "<p>Новий контакт доданий до вашого списку</p>",
    html: `<a target="_blank" href="http://localhost:5000/api/users/verify/${verificationToken}">Підтвердити email</a>`,
  };
  await sendEmail(sendMail);
  const mail = res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: { email, subscription, avatarURL, verificationToken },
    },
  });
};
module.exports = register;
