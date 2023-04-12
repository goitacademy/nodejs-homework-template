const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ctrlWrapper } = require("../../utils");
const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

//СТВОРЮЄМО КОНТРОЛЛЕР ДЛЯ РЕЄСТРАЦІЇ КОРИСТУВАЧА
const register = async (req, res) => {
  //1 перевіряємо чи немає вже в базі користувача з такою ж електронною поштою
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //1 Якщо в базі вже є такий користувач то викидуэмо помилку
  if (user) {
    throw HttpError(409, "Email in use");
  }

  //2 перед тим як зберегти пароль в базу ми його хешуємо для того щоб він візуально був прихований (захешований)
  const hashPassword = await bcrypt.hash(password, 10);

  //1 Якщо в базі немає такого користувача то ми створюємо його
  //2 Записуємо для користувача пароль в захешованому вигляді
  const result = await User.create({ ...req.body, password: hashPassword });

  //Отримуємо выдповідь з бази про створення нового користувача та повертаємо email новоствореного користувача
  res.status(201).json({
    email: result.email,
  });
};

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
  res.json({
    token,
  });
};

module.exports = { register: ctrlWrapper(register), login: ctrlWrapper(login) };
