const jwt = require('jsonwebtoken')
require('dotenv').config()

const createTokenUser = (email, _id) => {
    const payload = { _id, email }
    const options = { expiresIn: '23h', algorithm: 'HS256' }
    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign(payload, secretKey, options)

    return token
}

module.exports = createTokenUser