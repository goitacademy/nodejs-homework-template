const bcrypt = require("bcrypt")
const gravatar = require("gravatar")
const { nanoid } = require("nanoid")
const { User } = require("../../models/user")
const { HttpError, sendEmail } = require("../../helpers");


//Створюємо контролер реєстрації
const register = async (req, res) => {
  const { email, password } = req.body;
  // Преревіряємо чи є в базі даний користувач
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
// Додаємо демо аватарку
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  //Реєструємо нового користувача

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode });
  
  const verifyEmail = {
    to: email,
    subject: "Verify you email",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationCode}">Click verify email</a>`
  };

  await sendEmail(verifyEmail);

  // Передача на фронт енд
  res.status(201).json({
    subscription: newUser.subscription,
    email: newUser.email,
  });
}; 
module.exports = register;
