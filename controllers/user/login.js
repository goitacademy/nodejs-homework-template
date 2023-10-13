// const userSchema = require('../../models/schemas/users')
// const { handleUserRouter, createTokenUser, handleReqError } = require('../../helpers')
// const userModels = require('../../models/users')

// /**
//  * Обробляє запит для отримання користувача за email та перевірки паролю.
//  * @param {*} req Об'єкт запиту Express.
//  * @param {*} res Об'єкт відповіді Express.
//  * @param {*} next Функція, що передає керування наступному обробнику маршруту (middleware).
//  * @returns {Object} Відповідь повертає 200 з об'єктом користувача (email та subscription) та токеном.
//  * Якщо користувача не знайдено або пароль невірний, повертає помилку 401 з відповідним повідомленням.
//  */
// const login = async (req, res, next) => {
//     const { email, password } = req.user /* req.user */

//     const validDataUser = userSchema.validate({ email, password })
//     handleUserRouter(res, validDataUser)

//     const user = await userModels.getUserByEmail(email)

//     if (!user) {
//         return res.status(401).json({ message: 'Email or password is wrong' });
//     }

//     const passwordMatch = await user.comparePasswords(password)

//     if (!passwordMatch) {
//         return res.status(401).json({ message: 'Email or password is wrong' })
//     }

//     const token = createTokenUser(user.email)

//     const data = {
//         token
//         // email: user.email,
//         // subscription: user.subscription,
//     }

//     return res.status(200).json({ user: data }) /* ({ token, user: data }) */
// }

// module.exports = handleReqError(login)


const userSchema = require('../../models/schemas/users')
const { handleUserRouter, handleReqError } = require('../../helpers')
const userModels = require('../../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * Обробляє запит для отримання користувача за email та перевірки паролю.
 * @param {*} req Об'єкт запиту Express.
 * @param {*} res Об'єкт відповіді Express.
 * @param {*} next Функція, що передає керування наступному обробнику маршруту (middleware).
 * @returns {Object} Відповідь повертає 200 з об'єктом користувача (email та subscription) та токеном.
 * Якщо користувача не знайдено або пароль невірний, повертає помилку 401 з відповідним повідомленням.
 */
const login = async (req, res, next) => {
    const { email, password } = req.body /* req.user */

    const user = await userModels.getUserByEmail(email)
    const passwordMatch = await user.comparePasswords(password)
    const secretKey = process.env.JWT_SECRET;

    const validDataUser = userSchema.validate({ email, password })
    handleUserRouter(res, validDataUser)

    if (!user || !passwordMatch) {
        return res.status(401).json({
            status: "error",
            code: 401,
            message: 'Email or password is wrong'
        });
    }

    const payload = { _id: user._id }
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" })
    return res.status(200).json({
        status: "success",
        code: 200,
        data: { token, email: user.email, subscription: user.subscription },
    })
}

module.exports = handleReqError(login)