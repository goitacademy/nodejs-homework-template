const { User } = require('../../models/user');

const { HttpError } = require('../../helpers');

const register = async(req, res, next) => {
    try {
        const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const newUser = await User.create(req.body); // создаем пользователя

    res.status(201).json({ // на фронтенд передадим только имя и меил
        name: newUser.name,
        email: newUser.email,
    })
    } catch (error) {
        next(error);  
    }
}

module.exports = register;