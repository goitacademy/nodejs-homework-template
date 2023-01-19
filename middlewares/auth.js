/*
Витягує токен із заголовка та:
1. Перевірять валідність токена (тобто, що ми його видали і він не закінчився).
2. Витягує з токена id, знаходить користувача в базі id і прикріплює його до запиту
(Req.user).
*/

/*
1. Вийняти із заголовка запиту вміст заголовка Authorization.
2. Розділити його на 2 слова: bearer та токен
3. Перевірити чи перше слово "Bearer"
4. Перевірити валідність другого слова (токен)
5. Якщо токен валіден - витягти з нього ID і знайти користувачі в базі
  з таким ID.
  6. Якщо користувач з таким ID ми знайшли в базі - його потрібно
  прикріпити до запиту (об'єкт req)
*/
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;
const { User } = require('../models');

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized('Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid signature') {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
