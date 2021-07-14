const jwt = require('jsonwebtoken')
require('dotenv').config()

const { users: service } = require('../../services')

const register = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const result = await service.getOne({ email })
        if (result) {
            return req.status(409).json({
                status: 'error',
                code: 409,
                message: 'This user is already registered'
            })
        }

        const data = await service.add({ email, password })
        const { TOKEN_KEY } = process.env
        const payload = {
            id: data._id
        }
        const token = jwt.sign(payload, TOKEN_KEY)
        res.status(201).json({
            status: 'success',
            code: 201,
            message: 'User is successfully added',
            data: {
                token,
                user: {
                    email,
                    subscription: 'starter',
                }
            }
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = register
