const { Schema, model } = require("mongoose");
const Joi = require('joi');

const userDataValidatorJoi = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(5).alphanum().required(),
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

const User = model('user', UserSchema)

module.exports = {
    User,
    userDataValidatorJoi,
}