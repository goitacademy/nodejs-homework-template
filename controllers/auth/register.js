const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

// Реєстрація
const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    // Якщо користувач з таким email вже існує в БД
    // Статус помилки 409 видасть і handleMongooseError, але це для тексту повідомлення
    if (user) {
        throw HttpError(409, "Email already is use");
    }

    // Хешуємо пароль
    const hashPassword = await bcrypt.hash(password, 10);

    // Створюємо аватар
    const avatarURL = gravatar.url(email);

    // Створюємо нового користувача
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
}

module.exports = {
    register: ctrlWrapper(register),
}
