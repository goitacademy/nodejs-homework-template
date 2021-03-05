// const jwt = require('jsonwebtoken')
// const Users = require('../model/user')
// const { httpCode } = require('../helpers/constants')
// require('dotenv').config()
// const SECRET_KEY = process.env.JWT_SECRET

// const reg = (res, req, next) => {
//     try {
//         const { email } = req.body
//         const user = await Users.findByEmail(email)
//         if (user) {
//             res
//                 .status(httpCode.CONFLICT)
//                 .json({ status: 'error', code: httpCode.CONFLICT, data: 'Not found', message: 'Email is already used' })
//         }

//         const newUser = await Users.create(req.body)
//         return res.status(httpCode.CREATE).json({
//             status: 'success',
//             code: httpCode.CREATE,
//             data: {
//                 id: newUser.id,
//                 email: newUser.email,
//                 name: newUser.name
//             }
//         })
//     } catch (e) {
//         next(e)
//     }
// }

// const login = (res, req, next) => {
//     try {
//         const { password } = req.body
//         const user = await Users.findByEmail(users)
//         if (!user || !user.validPassword(password)) {
//             return res.status(httpCode.UNAUTHORIZED).json({
//                 status: 'error',
//                 code: httpCode.UNAUTHORIZED,
//                 data: UNAUTHORIZED,
//                 message: 'Invaliad credentials'
//             })
//         }
//         const id = user.id
//         const { payload } = id
//         const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
//         await Users.updateToken(id, token)
//         res.status(httpCode.OK).json({
//             status: 'success',
//             code: httpCode.OK,
//             data: {
//                 token
//             }
//         })
//     } catch (error) {
//         next(error)
//     }
// }

// const logout = (res, req, next) = {}

// module.exports = {
//     reg, login, logout
// }