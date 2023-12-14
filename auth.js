const express = require('express');
const router = express.Router();
const { registerValidation, loginValidation } = require('./validation');
const { registerUser, loginUser } = require('./authController'); // Додано контролери для реєстрації та логіну
const authMiddleware = require('./authMiddleware'); // Додайте мідлвар для перевірки токена

router.post('/register', async (req, res) => {
  // Виконати валідацію даних реєстрації
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Виконати реєстрацію користувача
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  // Виконати валідацію даних логіну
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Виконати логін користувача
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  try {
    // Знайдіть користувача за _id та видаліть його токен
    req.user.token = null;
    await req.user.save();

    res.status(204).end();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Додайте мідлвар перевірки токена, наприклад, authMiddleware
router.get('/current', authMiddleware, async (req, res) => {
  try {
    // Отримайте дані поточного користувача з req.user
    const currentUserData = {
      email: req.user.email,
      subscription: req.user.subscription,
    };

    // Поверніть успішну відповідь з даними користувача
    res.status(200).json(currentUserData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;