const { basedir } = global;
const bcrypt = require('bcryptjs');
const { User, schemas } = require(`${basedir}/models/user`);
const {createErr,sendEmail} = require(`${basedir}/helpers/createError`);
const gravatar = require('gravatar');
const{nanoid}= require("nanoid")

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
  if (error) {
    throw createErr(400, error.message);
  }
  const { email, password,} = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createErr(409, `${email} is use`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email)
  const verificationToken = nanoid()
  const result = await User.create({...req.body, password : hashPassword, avatarURL, subscription : "starter",verificationToken});
   const mail = {
    to: email,
    subject : "Подтверждение регистрации на сайте",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Нажмите для подверждения регистрации</a>`
   }
   await sendEmail(mail)

  res.status(201).json({
    email: result.email,
    password : hashPassword
  });
};

module.exports = register;
