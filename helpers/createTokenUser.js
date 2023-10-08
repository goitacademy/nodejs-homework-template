const jwt = require('jsonwebtoken')
require('dotenv').config()
const tokenJWT = process.env.JWT_SECRET

const createTokenUser = (email, _id) => {
    const payload = { _id, email }
    const options = { expiresIn: '1h', algorithm: 'HS256' }
    const secretKey = tokenJWT;

    const token = jwt.sign(payload, secretKey, options)

    return token
}

module.exports = createTokenUser