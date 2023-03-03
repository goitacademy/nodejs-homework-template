const { Conflict } = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target = "_blank" href="http://locallhost:3000/api/users/verify/${verificationToken}">Подтвердить email`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        password,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
