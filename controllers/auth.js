const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { httpCode } = require('../model/helpers/constants')
const { reset } = require('nodemon')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const reg = async (req, res, next) => {
    try {

        const { email } = req.body
        const user = await Users.findByEmail(email)

        if (user) {
            return res.status(httpCode.CONFLICT).json(
                { status: 'error', code: httpCode.CONFLICT, data: 'Conflict', message: 'Email in use' }
            )
        }
        const newUser = await Users.create(req.body)
        return res.status(httpCode.CREATE).json({
            status: 'success',
            code: httpCode.CREATE,
            data: {
                email: newUser.email,
                subscription: newUser.subscription,
                avatar: newUser.avatar
            }
        })
    } catch (e) {
        res.status(httpCode.BADREQUEST).json({ message: "Ошибка от Joi или другой валидационной библиотеки" })
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await Users.findByEmail(email)
        const validPassword = await user.validPassword(password)
        if (!user || !validPassword) {
            return res.status(httpCode.UNAUTHORIZED).json({
                status: 'error',
                code: httpCode.UNAUTHORIZED,
                message: 'Email or password is wrong'

            })
        }
        const id = user._id
        const payload = { id }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
        await Users.updateToken(id, token)
        res.status(httpCode.OK).json({
            status: 'success',
            code: httpCode.OK,
            data: {
                token,
                user: {
                    "email": user.email,
                    "subscription": user.subscription
                }
            }
        })
    } catch (e) {
        res.status(httpCode.UNAUTHORIZED).json({ message: "Email or password is wrong" })
    }
}

const logout = async (req, res) => {
    const id = req.user.id
    Users.updateToken(id, null)
    return res.status(httpCode.NOCONTENT).json({ message: 'Nothing' })
}



module.exports = {
    reg, login, logout
}