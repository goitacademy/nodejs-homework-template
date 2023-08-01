const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');
const { SECRET_KEY } = process.env;

// Авторизація
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    // Якщо користувач з таким email немає БД
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }

    // Якщо користувач не підтвердив свій e-mail
    if (!user.verify) {
        throw HttpError(401, "Email not verified");
    }

    // Порівнюємо паролі
    const passwordCompare = await bcrypt.compare(password, user.password);

    // Якщо паролі не співпали
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    // Формуємо payload для токена
    const payload = {
        id: user._id,
    }

    // Створюємо токен
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    // Додаємо токен в БД
    await User.findByIdAndUpdate(user._id, {token});

    res.status(200).json({
        token,
        "user": {
            "email": user.email,
            "subscription": user.subscription,
        }
    });
}

module.exports = {
    login: ctrlWrapper(login),
}
