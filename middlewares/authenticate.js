const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env
const { User } = require('../models/user')

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers
  //   console.log("Bearer: ", authorization.split(" ")[0]);
  //     console.log("Token: ", authorization.split(" ")[1]);
  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    // если не user, если нет токена или токен не равен выданному. Те. только 1 токен у человека может быть
    // if (!user || !user.token || user.token || token) {
    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    // Сохраняем аутинф пользователя для дальн. использования
    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' })
  }
}

module.exports = authenticate
