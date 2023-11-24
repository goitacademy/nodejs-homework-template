const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, validateUser } = require('../service/schemas/userSchema');

async function loginUser(req, res, next) {
  try {
    // Валидация запроса
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Поиск пользователя по email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    // Создание токена
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Сохранение токена в пользователе
    user.token = token;
    await user.save();

    // Отправка успешного ответа
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    // Обработка ошибок
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  // другие функции, если есть
};

