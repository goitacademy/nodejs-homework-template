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
    }
}, { versionKey: false, timestamps: true });


userSchema.post("save", (error, data, next)=> {
        error.status = 400;
        next();
}) 
   

const registerSchema = Joi.object({
name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(), 
})


const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().required(), 
})


const schemas = {
    registerSchema,
    loginSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}