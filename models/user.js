const { Schema, model } = require("mongoose");
const Joi = require('joi');
const { boolean } = require("joi");


const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: boolean,
        default: false,//Писля регістрації ще не підтверженний email
    },
    verifycationToken: {
        type: String,
        required: true,
    }//схему не треба створювати тому що verify , та verifycationToken це не є запит
}, {versionKey: false, timestamps: true});

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({     
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

const schemas = {
    register: registerSchema,
    login: loginSchema,
    email: emailSchema,
}

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
}