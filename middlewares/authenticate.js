const { User } = require('../model')
const { Unauthorized, NotFound } = require('http-errors')
const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env

const authenticate = async (req, res, next) => {

try {
     const [bearer, token] = req.headers.authorization.split(" ")
    if (bearer !== "Bearer") {
        throw new Unauthorized("Not authorized")
    }
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id )
    if (!user) {
        throw new NotFound('user not found')
    }
    req.user = user
    next()
} catch (error) {
    next(error)
}

  
    
           

}

module.exports=authenticate  