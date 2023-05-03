const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env
const {basedir} = global
const User = require(`${basedir}/models/user`)

const auth = async (req, res, next) => {
    const {authorization = ""} = req.headers
    const [bearer, token] = authorization.split(" ")
    if(bearer !== "Bearer") {
        return res.status(401).json({ status: 'error', code: 401, message: "Not authorized"})
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY)
        const user = await User.findById(id)
    if(!user || !user.token) {
        return res.status(401).json({ status: 'error', code: 401, message: "Not authorized"})
    }
    req.user = user
    next()
    } catch(error) {
        next(res.status(401).json({ status: 'error', code: 401, message: "Not authorized"}))
    }
}

module.exports = auth