const { userSchema } = require('../../models/validation/valid-user')
const { handleUserRouter, handleConflict } = require('../../helpers')

/**
 * Виконує валідацію 
 * Виконує обробку помилок, якщо не коректно введені дані
 * Виконує перевірку на наявність схожого email
 * Отримує body в форматі {password, email, subscription, _id} 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const registr = async (req, res, next) => {
    const validDataUser = userSchema.validate(req.body)

    handleUserRouter(res, validDataUser)

    const { email, password /* avatarUrl */ } = req.body

    handleConflict(req, res, email, password)
}

module.exports = registr