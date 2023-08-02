import joi from 'joi';

import { emailRegexp } from '../constans/user-constans.js';

const userSignupShema = joi.object({
    email: joi.string()
        .pattern(emailRegexp)
        .required()
        .messages({ "any.required": 'missed required email field' }),
    password: joi.string()
        .min(6)
        .required()
        .messages({ "any.required": 'missed required password field' }),
})

const userSigninShema = joi.object({
    email: joi.string()
        .pattern(emailRegexp).
        required()
        .messages({ "any.required": 'missed required email field' }),
    password: joi.string()
        .required()
        .messages({ "any.required": 'missed required password field' }),
})

export default {
    userSignupShema,
    userSigninShema
}

