const { handleConflict } = require('../helpers')
const User = require('../models/schemas/users')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} email Електронна адреса користувача для перевірки конфлікту.
 * @param {*} password Пароль користувача для зберігання в базі даних.
 * @returns {Object} Об'єкт відповіді зі статусом та повідомленням: 
 * - Якщо в body є поле email з існуючим, повертає json з ключем {"message": "Email in use"} і статусом 409 Conflict.
 * - якщо в body немає поля email з існуючим, повертає об'єкт з ключами {password, email} і статусом 201
 */
const createUser = async (req, res, email, password) => {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return res.status(409).json({ message: 'Email in use' })
    }

    handleConflict(req, res, email, password)
}

/**
 * Отримує користувача за email.
 * @param {*} email користувача
 * @returns {Promise<Object|null>} - Об'єкт користувача з властивостями email, subscription та token.
 * Якщо користувача не знайдено, повертає помилку 401 з повідомленням "message": "Email or password is wrong"
 */
const getUserByEmail = async (email) => {
    return await User.findOne({ email });
}

module.exports = {
    createUser,
    getUserByEmail
}

// module.exports = createUser