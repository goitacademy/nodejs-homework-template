const { User } = require('../model')
const { Unauthorized, NotFound } = require('http-errors')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

/*
1. Извлекает заголовок authrization
2. Строку в массив по пробелу
3. Проверяем первое слово "Bearer"
4. ПРоверяем токен на валидность
5. Находим в базе пользователя по id из токена
6. Прикрепляем его к запросу (объект req)
7. Передаем запрос дальше(next)
*/

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized()
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY)
      const user = await User.findById(id)
      if (!user) {
        throw new NotFound('User not found')
      }
      if (!user.token) {
        throw new Unauthorized()
      }
      req.user = user
      next()
    } catch (error) {
      throw new Unauthorized(error.message)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
