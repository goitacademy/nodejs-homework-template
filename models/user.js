const {Schema, model} = require('mongoose')
const Joi = require("joi");
const {handleMongooseError} = require('../helpers')

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ 

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: String,
      avatarURL: {
        type: String,
        required: true,
      }

    // name: {
    //     type: String,
    //     required: true,
    // },
    // email: {
    //     type: String,
    //     match: emailRegexp,
    //     unique: true,
    //     required: true,
    // },
    // password: {
    //     type: String,
    //     minlength: 6,
    //     required: true,
    // },
    // token: {
    //     type: String,
    //     default: "",
    // }

}, {versionKey: false, timestamps: true})

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({    
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model('user', userSchema)

module.exports = {
    User,
    schemas,
}