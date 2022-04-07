const { UserModel } = require("../db/users.model");
const {Conflict, NotFound, Forbidden} = require('http-errors');
const bcryptjs = require("bcryptjs");
const {getConfig }= require('../config');
// const res = require("express/lib/response");
const jwt = require ('jsonwebtoken')


const singUp = async (userParams)=> {
    
    const {username, email, password}= userParams;
const existingUser = await UserModel.findOne({email})

if(!!existingUser) {
    // res.status(409).send("Email in use")
    throw new Conflict('Email in use')
}

const {bcryptCostFactor} = getConfig();
 const hashPassord = await bcryptjs.hash(password, bcryptCostFactor);
 
 const user = await UserModel.create({
     username, email, password: hashPassord
 })

 return user
}

const signIn = async(loginParams)=> {
    const { email, password}= loginParams;
    const user = await UserModel.findOne({email})

    if(!user) {
        throw new NotFound(' User not found')
    }

    const isPassworCorrect = await bcryptjs.compare(password, user.password)

    if(!isPassworCorrect) {
        throw new Forbidden('This password is not correct')
    }

const token = createToken(user)
 return {user , token}
}

const createToken = (user) => {
    const config = getConfig();
    return jwt.sign({uid: user.id}, config.jwt.secret,{expiresIn: config.jwt.expiresIn})
}

module.exports ={
    singUp,
    signIn
}