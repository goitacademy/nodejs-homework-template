const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { httpCode } = require('../model/helpers/constants')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const reg = async (req, res, next) => {
    try {

        const { email } = req.body
        const user = await Users.findByEmail(email)

        if (user) {
            res
                .status(httpCode.CONFLICT)
                .json({ status: 'error', code: httpCode.CONFLICT, data: 'Not found', message: 'Email is already used' })
        }

        const newUser = await Users.create(req.body)
        return res.status(httpCode.CREATE).json({
            status: 'success',
            code: httpCode.CREATE,
            data: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name
            }
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await Users.findByEmail(email)
        if (!user || !user.validPassword(password)) {
            return res.status(httpCode.UNAUTHORIZED).json({
                status: 'error',
                code: httpCode.UNAUTHORIZED,
                data: httpCode.UNAUTHORIZED,
                message: 'Invaliad credentials'
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
                token
            }
        })
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    return true
}

module.exports = {
    reg, login, logout
}