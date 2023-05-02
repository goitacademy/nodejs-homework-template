const {Schema, model} = require('mongoose');
const Joi = require('joi');

const {handleMongooseError} = require('../helpers');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minLength: 6,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailRegexp,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String,
    avatarURL:{
        type: String,
        required:true,
    }
});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),

});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
});

// const schemas = {
//     registerSchema,
//     loginSchema,
// };

const User = model("user", userSchema);

module.exports = {
    User,
    // schemas,
    registerSchema,
    loginSchema,
}
