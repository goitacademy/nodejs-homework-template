const { userSchema } = require('../../routes/api/validation-user')
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
const postUser = async (req, res, next) => {
    const { error } = userSchema.validate(req.body)

    handleUserRouter(error, res)

    const { email, password } = req.body

    handleConflict(req, res, email, password)
}

module.exports = postUser