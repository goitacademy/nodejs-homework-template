const { userSchema } = require('../../routes/api/validation-user')
const { handleUserRouter, handleConflict } = require('../../helpers')



const postUser = async (req, res, next) => {
    const { error } = userSchema.validate(req.body)

    handleUserRouter(error, res)

    const { email, password } = req.body

    handleConflict(req, res, email, password)
}

module.exports = postUser