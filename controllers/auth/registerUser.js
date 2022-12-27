const { createError, hashPassword, sendEmail } = require("../../helpers");

const { USER_ALLREADY_EXIST, USER_REGISTERED } = require("./authConstants");

const { register, getUserByEmail } = require("../../models/authModel/auth");

const gravatar = require("gravatar");

const { randomUUID } = require("crypto");

async function registerUser(req, res, next) {
  const { name, email, password } = req.body;

  const foundResult = await getUserByEmail(email);

  if (foundResult) {
    console.log(foundResult);
    throw createError({ status: 409, message: USER_ALLREADY_EXIST });
  }

  const avatarURL = gravatar.url(email);

  const verificationToken = randomUUID();

  const newUser = {
    name: name,
    email: email,
    passwordHash: await hashPassword(password),
    verificationToken: verificationToken,
    avatarURL,
  };

  const result = await register(newUser);

  const emailOptions = {
    from: "testerovych@meta.ua",
    to: "goodcat1994@gmail.com",
    subject: "Nodemailer test",
    text: ` "Привіт. Ми тестуємо надсилання листів!", Посилання для підтвердження реєстрації: http://localhost:3000/api/users/verify/${verificationToken}`,
    html: "<strong>Привіт. Ми тестуємо надсилання листів!</strong>",
  };

  const afterEmailSendRes = await sendEmail(emailOptions);

  console.log(afterEmailSendRes);

  res.status(201).json({
    data: result,
    message: USER_REGISTERED,
    afterEmailSendRes,
  });
}

module.exports = registerUser;
