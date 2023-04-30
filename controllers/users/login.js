const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
//dotenv завантажує змінні середовища з файлу .env, Після ми підключаємо модуль у нашому додатку 
//і він додає змінні оточення в об'єкт process.envмо
//.env ми повинні додати до .gitignore

const { User } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const comparePassword = await bcrypt.compare(password, user.password);
  // беремо хешований пароль і введений користувачем при логінізації та перевіряємо
  if (!user || !comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // npm i jsonwebtoken
  await User.findByIdAndUpdate(user._id, { token });
 return res.status(200).json({
    token,
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
