const { User } = require('../../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { validateUser } = require('../../middlewares/validation')

// const tokenValidation = require('../../middlewares/tokenValidation');

/* REGISTRATION /signup
 - делаем валидацию body 
 - создаём схему для валидации тела запроса /signup при помощи Joi 
 - ищем пользователя по email который указан в запросе
 - если пользователь существует бросаем исключение тк не может быть 2х пользователей с одинаковыми email - 409 conflict
 - хэшируем пароль
 - сохраняем пользователя и отправляем успешный запрос
*/

router.post('/signup', validateUser, async (req, res) => {
  const salt = process.env.BCRYPT_SALT_ROUNDS;
  // проверка существует ли пользователь с таким email
  const userExist = await User.findOne({ email: req.body.email }) // сокращенная 
  if (userExist) {
    return res.status(409).send('user with this email already existed!')
  }

  let user = new User({
    // k.borysenko@gmail.com
    // 123456
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, parseInt(salt)),
  })
  user = await user.save();

  if (!user)
    return res.status(400).send('the user cannot be created!')

  res.send(user);
})

module.exports = router;
