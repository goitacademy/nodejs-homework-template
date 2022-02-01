/* eslint-disable no-useless-escape */
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

const userSchema = Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        match: emailRegexp,
        unique:true,
    },
    password:{
        type: String,
       required: true,
       minlength:6,
       
    },
    token: {
        type: String,
        default:null,
    },
    avatarUrl:{
        type:String,
        default:'',
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

const joiRegisterSchema = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});
const joiLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const User = model('user', userSchema);

module.exports = { User, joiRegisterSchema, joiLoginSchema }