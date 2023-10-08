const { userSchema } = require('../../routes/api/validation-user')
const { handleUserRouter } = require('../../helpers')
const { createUser } = require('../../models/users')

/**
 * Виконує валідацію 
 * Виконує обробку помилок, якщо не коректно введені дані
 * Виконує перевірку на наявність схожого email
 * Отримує body в форматі {password, email, subscription, _id} 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const postUser = async (req, res, next) => {
    const validDataUser = userSchema.validate(req.body)

    handleUserRouter(res, validDataUser)

    const { email, password } = req.body

    createUser(req, res, email, password)
}

module.exports = postUser