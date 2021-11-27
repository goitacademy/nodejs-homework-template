const { NotFound, BadRequest } = require("http-errors");
const validator = require("validator");
const { User } = require("../../models");
const { sendMail } = require("../../helpers");

const newVerify = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new NotFound("missing required field email");
  }
  if (!validator.isEmail(email)) {
    throw new BadRequest("Ошибка от Joi или другой библиотеки валидации");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }
  const { verify, verificationToken } = user;
  if (verify) {
    throw new BadRequest("Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Повторное письмо. Подтвердите регистрацию",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}">Нажмите сюда для подтверждения email </a>`,
  };
  await sendMail(mail);
  res.status(200).json({
    status: "success",
    code: 200,
    result: "Verification email sent",
  });
};

module.exports = { newVerify };
