const { Schema, model } = require('mongoose');
const Joi = require('joi');


const userVerifyJoi = Joi.object({
    password: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    email: Joi.string()
        .email()
        .max(30)
        .min(5),
})

const UserSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
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
    token: {
        type: String,
        default: null,
    },
})

const User = model('users', UserSchema)

module.exports = {
    User,
    userVerifyJoi,
}