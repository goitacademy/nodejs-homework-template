const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const gravatar = require("gravatar")

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


  //Реєструємо нового користувача

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
  // Передача на фронт енд
  res.status(201).json({
    subscription: newUser.subscription,
    email: newUser.email,
  });
}; 
module.exports = register;
