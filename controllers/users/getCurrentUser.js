const jwt = require('jsonwebtoken')
require('dotenv').config()

const { users: service } = require('../../services')

const getCurrentUser = async (req, res, next) => {
    const { email } = req.body
    try {
        res.json({
            status: 'success',
            code: 200,
            data: {
                email,
                subscription: 'starter'
            }
        })
    }
    catch (error) {
        res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Not authorized'
        })
    }
}

module.exports = getCurrentUser
