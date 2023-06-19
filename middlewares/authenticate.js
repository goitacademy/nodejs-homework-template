const jwt = require("jsonwebtoken")

const { HttpError } = require('../helpers')

const { SECRET_KEY } = require('../config.js')

const User = require("../models/user-schema")

const authentication = async(req, res, next) => {
    const {authorization = ""} = req.headers
    const [bearer, token] = authorization.split(" ")
    if (bearer !== "Bearer") {
        next(HttpError(401))
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY)
        const user = await User.findById(id)
        if (!user || !user.token) {
            next(HttpError(401))
        }
        req.user = user
        next()
    } catch (error) {
        next(HttpError(401))
    }
}

module.exports = authentication