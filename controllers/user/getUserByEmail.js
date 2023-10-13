const userSchema = require('../../models/schemas/users')
const { handleUserRouter, createTokenUser, handleReqError } = require('../../helpers')
const userModels = require('../../models/users')

/**
 * Обробляє запит для отримання користувача за email та перевірки паролю.
 * @param {*} req Об'єкт запиту Express.
 * @param {*} res Об'єкт відповіді Express.
 * @param {*} next Функція, що передає керування наступному обробнику маршруту (middleware).
 * @returns {Object} Відповідь повертає 200 з об'єктом користувача (email та subscription) та токеном.
 * Якщо користувача не знайдено або пароль невірний, повертає помилку 401 з відповідним повідомленням.
 */
const getUserByEmail = async (req, res, next) => {
    const { email, password } = req.user /* req.user */

    const validDataUser = userSchema.validate({ email, password })
    handleUserRouter(res, validDataUser)

    const user = await userModels.getUserByEmail(email)

    if (!user) {
        return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const passwordMatch = await user.comparePasswords(password)

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Email or password is wrong' })
    }

    const token = createTokenUser(user.email)

    const data = {
        email: user.email,
        subscription: user.subscription,
    }

    return res.status(200).json({ token, user: data })
}

module.exports = handleReqError(getUserByEmail)