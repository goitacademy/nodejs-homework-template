const jwt = require('jsonwebtoken')

const { User } = require('../models/user')

const { HttpError } = require("../helpers/HttpError")

const {SECRET_KEY} = process.env

const authenticate = async (req, res, next) => {
    const { authorization = ""} = req.headers
    const [bearer, token] = authorization.split(" ")
    if (bearer !== "Bearer") {
        return next(HttpError(401, "Not authorized"))
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY)
        console.log(id)
        const user = await User.findById(id)
        if (!user) {
            return next(HttpError(401, "Not authorized"))
        }
        
        if (user.token !== token) {
            return res.status(401).send({message: "Not authorized"})
        }

        req.user = user
        
        next()
    }
    catch {
       return next(HttpError(401, "Unautorized")) 
    }
}

module.exports = authenticate