const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { User } = require('../../models/user');
const { HttpError, ctrlWrapper, sendEmail } = require('../../helpers');
const { BASE_URL } = process.env;

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

    // Створюємо токін для підтвердження e-mail
    const verificationToken = nanoid();

    // Створюємо нового користувача
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    // Формуємо лист для підтвердження e-mail
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`
    }

    // Відправляємо лист для підтвердження e-mail
    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
}

module.exports = {
    register: ctrlWrapper(register),
}
