// const userModel = require('../../models/users')
// const { userSchema } = require('../../routes/api/validation-user')
// const { handleUserRouter } = require('../../helpers')

// const getUserById = async (req, res, next) => {
//     const { email, password } = req.body
//     const validDataUser = userSchema.validate({ email, password })

//     handleUserRouter(res, validDataUser.error)

//     userModel.getUserById(email)
// }

// module.exports = getUserById