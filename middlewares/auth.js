// created by Irina Shushkevych
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { userSchema } = require('../models')

const { SECRET_KEY } = process.env

const findUser = async (token) => {
    const { id } =  jwt.decode(token)
    return await userSchema.User.findById(id)
}

const auth = async (req, res, next) => {
  const {authorization = ''} = req.headers
  const [bearer, token] = authorization.split(" ")

  if (bearer !== 'Bearer' || !token){
    return next(Unauthorized())
  }

  try{
    jwt.verify(token, SECRET_KEY)
    req.user = await findUser(token)
    next()
  } catch(error){
    if (error.message.toLowerCase() === 'jwt expired'){
        const {id} =  await findUser(token)
        await userSchema.User.findByIdAndUpdate(id, {token:null})
        return next(Unauthorized())
    }
    if (error.message.toLowerCase() === 'invalid signature'){
      return next(Unauthorized())
    }
  } 
}

module.exports = { auth }