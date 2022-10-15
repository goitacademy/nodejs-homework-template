const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuid } = require("uuid");

const { authServices } = require("../../services");
const { sendMail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.getByEmail({ email });
  if (user) throw createError(409, "email is already registered");

  const verificationToken = uuid();
  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href='http://localhost:3000/users/verify/${verificationToken}'>Confirm email</a>`,
  };
  sendMail(mail);

  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await authServices.register(
    email,
    hashPassword,
    avatarURL,
    verificationToken
  );
  res.status(201).json({
    status: "success",
    code: "201",
    payload: {
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
