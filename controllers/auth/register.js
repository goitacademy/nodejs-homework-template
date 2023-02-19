const { Conflict } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../sendgrid/helpers");

const register = async (req, res) => {
  const { name, password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = await User.create({
    name,
    password: hashPassword,
    email,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Підтвердження email",
    html: `<a target="_blank" href = "http://localhost:3000/api/users/verify/${verificationToken}">Натисніть для підтвердження email</a>`,
    };
    await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
        avatarURL,
        verificationToken,
        subscription: newUser.subscription,
      },
    },
  });
};
module.exports = register;
