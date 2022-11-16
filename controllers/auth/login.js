const { User } = require("../../models/user");
const { makeError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const {SECRET_KEY} = process.env


const login = async(req,res,next) => {
    const {email,password} = req.body

    const result = await User.findOne({email})
    if(!result){
        next(makeError(401))
    }
    const passResult = await bcrypt.compare(password, result.password)
    if(!passResult){
        next(makeError(401, 'Пароль або пошта невірні'))
    }
    const token = jwt.sign({id: result._id}, SECRET_KEY, {expiresIn: '23h'})
    await User.findByIdAndUpdate(result._id, {token})
    res.json({token, user: {
        email: result.email,
        subscription: result.subscription
    }}).status(201)
}

module.exports = login