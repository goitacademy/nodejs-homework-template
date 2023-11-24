// controllers\users.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, validateUser } = require('../service/schemas/userSchema');

async function registerUser(req, res, next) {
  try {
    // Валидация запроса
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Проверка, не используется ли уже email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    // Хеширование пароля
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Создание нового пользователя
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      subscription: 'starter', // или другое значение по умолчанию
    });

    // Сохранение пользователя в базе данных
    await newUser.save();

    // Отправка успешного ответа
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    // Обработка ошибок
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

async function loginUser(req, res, next) {
  // Реализация входа пользователя
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
    // console.log(token);

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

async function logoutUser(req, res, next) {
  // Реализация выхода пользователя
  try {
    // Получаем ID пользователя из токена
    const userId = req.user.id;

    // Находим пользователя по ID
    const user = await User.findById(userId);

    // Проверяем, существует ли пользователь
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

  // Проверяем, что токен в запросе соответствует токену в базе данных
  if (req.headers.authorization.split(' ')[1].localeCompare(user.token) !== 0) {
    return res.status(401).json({ message: 'Not authorized: Token mismatch' });
  }
  
    // Удаляем токен у пользователя
    user.token = null;

    // Сохраняем изменения в базе данных
    await user.save();

    // Отправляем успешный ответ . 
    res.status(204).end();
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


async function getCurrentUser(req, res, next) {
  // Реализация получения данных текущего пользователя
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user || token !== user.token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized' });
  }
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
