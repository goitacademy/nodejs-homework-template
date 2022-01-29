// const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');
// const Joi = require('joi');



const userSchema = Schema({
    name: {
        type: String,
    },

    password: {
        type: String,
        minlength: 6,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,

        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ['starter', 'pro', 'business'],
        default: 'starter'
    },
    token: {
        type: String,
        default: null,
    }


}, { versionKey: false, timestamps: true });



const User = model('user', userSchema);

module.exports = {
    User
}