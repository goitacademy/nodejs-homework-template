const { Schema, model } = require('mongoose');
const Joi = require('@hapi/joi');

const emailRegexp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/; 

const userSchema = new Schema({
    password: {
        type: String,
        minLength: 6,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: ""
    },
    avatarURL: {
    type: String,
    required: true,
    },
    verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
    
}, { versionKey: false, timestamps: true });



userSchema.post("save", (error, data, next)=> {
        error.status = 400;
        next();
}) 
   

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),

})


const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})


const schemas = {
    registerSchema,
    loginSchema,
    emailSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}