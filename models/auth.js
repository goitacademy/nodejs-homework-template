const User  = require('./user');
const bcrypt = require('bcrypt')
const registerSchema = require("../routes/api/registerSchema");
const loginSchema = require("../routes/api/loginSchema");
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env



const register = async (userData) => {
  const { name, email, password } = userData;

  // Валидация с помощью Joi
  const validationResult = registerSchema.validate({ name, email, password });

  if (validationResult.error) {
    // Если валидация не прошла успешно, верните ошибку клиенту
    throw new Error(validationResult.error.message);
  }

  const user = await User.findOne({ email });

  if (user) {
    throw new Error("Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashPassword });

  return {
    email: newUser.email,
    subscription: "starter"
  };
};
  
  



  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Валидация данных с использованием Joi
      const { error } = loginSchema.validate({ email, password });
  
      if (error) {
        // Повернення помилки валідації
        return res.status(400).json({ message: error.details[0].message });
      }
  
      // Пошук користувача за email
      const user = await User.findOne({ email });
  
      if (!user) {
        // Повернення помилки "Unauthorized" якщо користувача не знайдено
        return res.status(401).json({ message: "Email or password is wrong" });
      }
  
      // Порівняння пароля
      const passwordCompare = await bcrypt.compare(password, user.password);
  
      if (!passwordCompare) {
        // Повернення помилки "Unauthorized" якщо пароль невірний
        return res.status(401).json({ message: "Email or password is wrong" });
      }
  
      // Генерація токена аутентифікації
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "24h",
      });
  
      res.json({
        token,
        user: {
          email: user.email,
          subscription: "starter" // Приклад - замініть це значення на реальний підпис користувача
        },
      });
    } catch (err) {
      // Обробка інших помилок сервера
      res.status(500).json({ message: "Server error" });
    }
  };
  
  const logout = (req, res) => {
    // Удаление токена аутентификации с клиента (если токен хранится в куках, очистите куку)
    res.clearCookie('token');
  
    res.status(200).json({ message: "Выход из системы прошел успешно" });
  };


const current= (req, res) => {
const {email, name} = req.user;
res.json(
  {email,
  name,}
)
}

  module.exports = { register,
login, logout, current};



