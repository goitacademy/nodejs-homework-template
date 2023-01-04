const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const [, token] = req.headers.authorization.split(' ')

    if (!token) {
        res.status(401).json({"message": "Not authorized"})
        next()
    }

    try {
        const user = jwt.decode(token, process.env.JWT_SECRET)
        req.token = token
        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    authMiddleware
}