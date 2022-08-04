// Перевірка Токена!!!
// бере токен із заголовків Authorization та перевіряє його на валідність
// якщо помилка, вернути - Unauthorized.
// якщо валідація пройшла успішно, отримати з токена id користувача і найти його в базі даних (по цьому же id)
// якщо користувач існує і токен співпадає з тим, що знаходиться в базі, то 
// записати його дані в req.user і викликати метод next()
// якщо користувача з таким id не існує або токени не співпадають, то повернути помилку Unauthorized


const jwt = require('jsonwebtoken');

const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const { SECRET_KEY } = process.env;

const auth = async (req, _res, next) => {
    const { authorization = ''} = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
        throw createError(401, 'Not authorized');
    }

    try { 
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);

        if (!user || !user.token) {
            throw createError(401, 'Not authorized');
        }

        req.user = user;
        next();
    } catch (error) {
        next(createError(401, error.message));
    }
};

module.exports = auth;

