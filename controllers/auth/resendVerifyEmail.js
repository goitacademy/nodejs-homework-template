const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);
const createError = require(`${basedir}/helpers/createError`);
const { sendEmail } = require(`${basedir}/helpers`);

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { error } = schemas.email.validate(email);
  if (error) {
    throw createError(400, error.massage);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404);
  }
  if (user.varify) {
    throw createError(400, 'Verification has already been passed');
  }
  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Нажмите для подверждения регистрации</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent"
  })
};

module.exports = resendVerifyEmail;
