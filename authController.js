const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./routes/api/contacts'); 

async function registerUser(userData) {
  const { email, password } = userData;

  require('dotenv').config();


  // Перевірка, чи є вже користувач з такою електронною адресою
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is already in use');
  }

  // Хешування пароля
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Створення нового користувача
  const user = new User({
    email,
    password: hashedPassword,
  });

  // Збереження користувача в базі даних
  await user.save();

  // Видалення паролю з відповіді
  const userResponse = {
    email: user.email,
    subscription: user.subscription,
  };

  return { user: userResponse };
}

async function loginUser(userData) {
  const { email, password } = userData;

  // Пошук користувача за електронною адресою
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email or password is wrong');
  }

  // Перевірка пароля
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Email or password is wrong');
  }

  // Створення JWT-токена
  const secretKey = process.env.JWT_SECRET || 'qWesz0874531764X';
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });


  // Збереження токена у користувача
  user.token = token;
  await user.save();

  // Видалення паролю з відповіді
  const userResponse = {
    email: user.email,
    subscription: user.subscription,
  };

  return { token, user: userResponse };
}

module.exports = { registerUser, loginUser };
