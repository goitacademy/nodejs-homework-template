// глобальні імпорти
const Joi = require('joi');
const bcrypt = require('bcryptjs'); // бібліотека для хешування 
const jwt = require('jsonwebtoken');
// локальні імпорти
const { HttpError } = require('../helpers'); // обробка помилок
const User = require('../models/User');
const checkToken = require('../middlewares/authMiddleware');


const addSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
  });
const register = async (req, res, next) => {
    try {
      const { email, password } = req.body;
       // Перевірка на відсутність обох полів email та password
        if (!email || !password) {
          throw new HttpError(400, 'Потрібно заповнити всі поля');
        }
        // Валідація паролю та електронної адреси
        const { error } = addSchema.validate(req.body, { abortEarly: false });
    
        if (error) {
          const errorMessage = error.details.map((err) => err.message).join('; ');
          throw new HttpError(400, errorMessage);
        }

    // Перевірка наявності електронної адреси в БД
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Такий email вже використовується' });
    }

    // Хешування паролю
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const user = new User({
      email,
      password: hashedPassword,
      subscription: 'starter'
    });

    await user.save();
    res.status(201).json({ user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    next(error);
  }
};


const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(409).json({ message: 'Вам потрібно заповнити усі поля' });
  }

  try {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Помилка при порівнянні паролів' });
        } else {
          if (result) {
            const JWT_SECRET = process.env.JWT_SECRET
            const payload = {userId: user._id}
            const token = jwt.sign(payload, JWT_SECRET, {expiresIn:"1h"})
            updateTokenStatus(user._id, {token})
            const responseData = {
              token,
              user: {
                email: user.email,
                subscription: user.subscription
              }
            }
            return res.status(200).json(responseData)
          } else {
            return res.status(400).json({ message: 'Паролі не співпадають' });
          }
        }
      });
    } else {
      return res.status(409).json({ message: 'Такого користувача не знайдено' });
    }
  } catch (err) {
    return res.status(500).json({ message: `Помилка під час пошуку користувача: ${err}` });
  }
};

 
const logout = async (req, res, next) => {
  try {
    const isCorectToken = checkToken();
    if (isCorectToken) {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!req.user) {
        return res.status(401).json({ message: 'Не авторизований' });
      }

      user.token = null;
      await user.save();

      res.sendStatus(204);
    }
  } catch (error) {
    next(error); // Викидаємо помилку для подальшого оброблення
  }
};



const corentUserData = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};
module.exports = {
  register,
  login,
  logout,
  corentUserData,
 
};

// Функція для оновлення статусу контакту
async function updateTokenStatus(contactId, updateFields) {
  try {
    const updatedContact = await User.findByIdAndUpdate(
      contactId,
      { $set: updateFields },
      { new: true }
    );

    return updatedContact;
  } catch (error) {
    throw new HttpError(500, 'Внутрішня помилка серверу');
  }
}
