import joi from 'joi';

import { emailRegexp } from '../constans/user-constans.js';

const userSignupShema = joi.object({
    email: joi.string().pattern(emailRegexp).required,
    password: joi.string().min(6).required,
})

const userSigninShema = joi.object({
    email: joi.string().pattern(emailRegexp).required,
    password: joi.string().required,
})

export default {
    userSignupShema,
    userSigninShema
}

