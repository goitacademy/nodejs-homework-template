const jwt = require('jsonwebtoken')
const { User } = require('../../db/userModel')

const authMiddleware = async (req, res, next) => {
    try {
        const [, token] = req.headers.authorization.split(' ')

        if (!token) {
            res.status(401).json({"message": "0 Not authorized"})
            next()
        }

        const userToken = jwt.decode(token, process.env.JWT_SECRET)
        const user = await User.findById(userToken?._id)

        if (!user || user.token !== token) {
            res.status(401).json({"message": "Not authorized"})
            next()
        }
        
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