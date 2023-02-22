const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../routes/api/helpers");

const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`409, Email ${email} in use`);
  }

  // метод для проверки пароля
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}>Verificate your email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    Status: "success",
    code: 201,
    data: {
      user: {
        email: email,
        subscription: subscription,
        password: password,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
