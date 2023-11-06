import Joi from "joi"
import { Schema, model } from "mongoose";
import { handlerSaveError, runValidatorsAtUpdate } from '../models/hooks.js';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const usersSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 6,
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

    avatarURL: {
        type: String,
        require: true
    },
    token: {
        type: String,
        default: ""
    },
    verify: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        default: ""
    }
}, { versionKey: false, timestamps: true })
usersSchema.post('save', handlerSaveError);
usersSchema.post('findOneAndUpdate', handlerSaveError);
usersSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);


export const singUpSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string()
})
export const singInSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required()
})

export const verifySchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required()
})


const ModelUser = model('user', usersSchema);

export default ModelUser;
