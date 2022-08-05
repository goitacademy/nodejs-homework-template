const {basedir} = global
const bcrypt = require('bcryptjs');
const {User,schemas} = require(`${basedir}/models/user`)
const createError = require (`${basedir}/helpers/createError`)
const jwt = require('jsonwebtoken')
const{SECRET_KEY} = process.env

const login = async(req,res)=>{
   const {error} =  schemas.login.validate(req.body)
    if (error) {
        throw createError(400,error.massage)
    }
    const {email,password}= req.body
    const user = await User.findOne({email},'-createdAt -updatedAt ')
    if (!user) {
        throw createError(401,"Email Wrong")      
    }
    const comparePassword = await bcrypt.compare(password,user.password)
    if (!comparePassword) {
        throw createError (401, "Password wrong")
    }
    const payload = {
      id: user._id  
    }
    const token = jwt.sign(payload,SECRET_KEY,{expiresIn: "24h"})
     await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
        user
    })
}

module.exports = login