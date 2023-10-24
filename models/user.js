const { Schema, model } = require('mongoose');
const Joi = require('joi');
const handleMongooseError = require('../helpers/handleMongooseError');

const emailMatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        match: emailMatch,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
        default: null,
    },
}, {
    versionKey: false,
});

userSchema.post('save', handleMongooseError);

const User = model('User', userSchema);

const logRegSchema = Joi.object({
    email: Joi.string().pattern(emailMatch).required(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    User,
    logRegSchema,
};
