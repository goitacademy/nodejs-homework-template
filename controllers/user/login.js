const userSchema = require('../../models/schemas/users')
const { handleUserRouter, handleReqError, HttpError } = require('../../helpers')
const User = require('../../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// const { v4: uuidv4 } = require('uuid')

/**
 * Обробляє запит для отримання користувача за email та перевірки паролю.
 * @param {*} req Об'єкт запиту Express.
 * @param {*} res Об'єкт відповіді Express.
 * @param {*} next Функція, що передає керування наступному обробнику маршруту (middleware).
 * @returns {Object} Відповідь повертає 200 з об'єктом користувача (email та subscription) та токеном.
 * Якщо користувача не знайдено або пароль невірний, повертає помилку 401 з відповідним повідомленням.
 */
const login = async (req, res, next) => {

    const { email, password, avatarURL, verificationToken } = req.body

    // const verificationToken = uuidv4()
    const user = await User.getUserByEmail(email)
    const passwordMatch = await user.comparePasswords(password)
    const secretKey = process.env.JWT_SECRET

    const validDataUser = userSchema.validate({ email, password, avatarURL, verificationToken })
    handleUserRouter(res, validDataUser)

    if (!user || !passwordMatch) {
        return next(HttpError(401, "Not authorized"))
    }

    if (!user.avatarURL) {
        return next(HttpError(400, "Avatar is required"));
    }

    const payload = { _id: user._id, email: user.email }
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" })
    await User.updateToken(payload, token)
    return res.status(200).json({
        status: "success",
        code: 200,
        data: {
            token,
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL,
            verificationToken: user.verificationToken
        },
    })
}

module.exports = handleReqError(login)