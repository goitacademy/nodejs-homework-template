const User = require('../models/schemas/users')
const bcrypt = require('bcrypt')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} email Електронна адреса користувача для перевірки конфлікту.
 * @param {*} password Пароль користувача для зберігання в базі даних.
 * @returns {Object} Об'єкт відповіді зі статусом та повідомленням: 
 * - Якщо в body є поле email з існуючим, повертає json з ключем {"message": "Email in use"} і статусом 409 Conflict.
 * - якщо в body немає поля email з існуючим, повертає об'єкт з ключами {password, email, subscription, _id} і статусом 201
 */
const handleConflict = async (req, res, email, password) => {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(409).json({ message: 'Email in use' })
    }

    const saltIter = 10
    const hashPass = await bcrypt.hash(password, saltIter)

    const newUser = new User({
        email,
        password: hashPass,
        subscription: 'starter',
    })

    try {
        await newUser.save()
        return res.status(201).json({ user: newUser })
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = handleConflict