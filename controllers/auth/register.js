const bcrypt = require('bcrypt');
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');

const register = async(req, res, next) => {
    try {
        const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10) // хешируем пароль

    const newUser = await User.create({...req.body, password: hashPassword}); // создаем пользователя

    res.status(201).json({ // на фронтенд передадим только меил
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    })
    } catch (error) {
        next(error);  
    }
}

module.exports = register;