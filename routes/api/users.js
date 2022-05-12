const { User } = require('../../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  const userExist = await User.findOne({ email: req.body.email })
  if (userExist) {
    return res.status(409).send('user with this email already existed!')
  }

  let user = new User({
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, parseInt(salt)),
  })
  user = await user.save();

  if (!user)
    return res.status(400).send('the user cannot be created!')

  res.send(user);
})

/*
login - вход пользователя на сайт
- пишем middleware 
- делаем валидацию body 
- ищем пользователя по email, если пользователя нет возвращаем ошибку 401 или 404
- сравниваем пароли и если не совпадают бросаем ошибку 403
- генерируем jwt - token который будем использовать для проверки личности пользователя
- отправляем успешный ответ
*/
router.post('/login', validateUser, async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send('The user not found');
  }
  // метод который сравнивает пароли 
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    // генерируем token
    const token = jwt.sign(
      // указываем что хотим положить в него 
      {
        sub: user.id,
      },
      jwtSecret,
      // время жизни нашего token
      { expiresIn: jwtExpiresIn }
    )

    res.status(200).send({ user: user.email, token: token })
  } else {
    res.status(409).send('email or password is wrong!');
  }


})
module.exports = router;
