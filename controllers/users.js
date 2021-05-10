const Users = require('../model/users')
const { HttpCode } = require('../helper/constants')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
 
const registration = async (req, res, next) => {
    const { email } = req.body
    const user = await Users.findEmail(email)
    if (user) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message:'Email is already use'
        })
    }
    try {
        const newUser = await Users.createUser(req.body)
        return res.status(HttpCode.CREATED).json({
            status: 'succes',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                email: newUser.email,
            }
        })
    } catch (error) {
        
    }
 }

const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await Users.findEmail(email)
    const isValidPassword = await user?.validPassword(password)

    if (!user || !isValidPassword) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Invalid credentials'
        })
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })

    await Users.updateToken(user.id, token)

    return res.status(HttpCode.OK).json({
        status: 'succes',
        code: HttpCode.OK,
        data: { token }
    })

 }

const logout = async (req, res, next) => {
    const id = req.user.id  
    await Users.updateToken(id, null)

    return res.status(HttpCode.NO_CONTENT).json({
        status: 'error',
        code: HttpCode.NO_CONTENT,
        message: 'No Content'
    })
}

const current = async (req, res, next) => {
    const id = req.user.id
    const user = await Users.findById(id)
    return res.json({
        status: 'success',
        code: 200,
        data: {
            email: user.email,
            subscription: user.subscription,
        }
    })
   
}

const updateAvatar = async (req, res, next) => {}

module.exports = {
    registration,
    login,
    logout,
    current,
    updateAvatar,
}