const bcrypt = require("bcrypt")
const gravatar = require("gravatar")
const { nanoid } = require("nanoid")
const { User } = require("../../models/user")
const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

// Створюємо контролер реєстрації
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
  const verificationToken = nanoid();

  // Реєструємо нового користувача

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
  
  const verifyEmail = {
    to: email,
    subject: "Verify you email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`
  };

  await sendEmail(verifyEmail);

  // Передача на фронт енд
  res.status(201).json({
    subscription: newUser.subscription,
    email: newUser.email,
  });
}; 
module.exports = register;
