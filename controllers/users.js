const Users = require('../model/users')
const { HttpCode } = require('../helper/constants')

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

const login = async (req, res, next) => { }

const logout = async (req, res, next) => { }

module.exports = {
    registration,
    login,
    logout,
}