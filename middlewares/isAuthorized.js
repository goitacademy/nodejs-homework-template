const {makeError} = require('../helpers')
const jwt = require('jsonwebtoken')
const {User} = require('../models/user')
require('dotenv').config()

const {SECRET_KEY} = process.env

const isAuthorized = async(req,res,next) => {
    const {authorization = ''} = req.headers
    const [bearer, token] = authorization.split(' ')
    if(bearer !== 'Bearer' || !token){
        next(makeError(401))
    }
    const result = jwt.verify(token,SECRET_KEY)
    if(!result){
        next(makeError(401))
    }
    const user = await User.findById(result.id)
    console.log(user);
    req.user = user
    next()
}

module.exports = isAuthorized