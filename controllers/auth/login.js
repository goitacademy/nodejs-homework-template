const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

//СТВОРЮЄМО КОНТРОЛЛЕР ДЛЯ ЛОГІНІЗАЦІЇ КОРИСТУВАЧА
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  //3 порівнюємо пароль який ми передаємо з захешованим паролем який міститься в об'єкті user`а в базі даних
  const passwordCompare = await bcrypt.compare(password, user.password);
  //Якщо паролі не співпадають то викидуємо помилку
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  //Якщо паролі співпадають то створюємо токен та відправляємо його у відповідь, на фронтенд
  const payload = {
    //Беремо id користувача з бази даних для payload
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

module.exports = login;
