const {makeError} = require('../helpers')
const jwt = require('jsonwebtoken')
const {User} = require('../models/user')

const {SECRET_KEY} = process.env

const isAuthorized = async(req,res,next) => {
    const bearerToken = req.quary
    const [bearer, token] = bearerToken
    if(bearer !== 'Bearer' || !token){
        next(makeError(401))
    }
    const result = jwt.verify(token,SECRET_KEY)
    if(!result){
        next(makeError(401))
    }
    const user = User.findById(result.id)
    req.user = user
    next()
}

module.exports = isAuthorized