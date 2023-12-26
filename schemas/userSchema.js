const Joi = require('joi');
const { regexp, constants } = require('../vars');

exports.userSchema = Joi.object({
    password:  Joi.string().pattern(regexp.pswd).required().messages({'any.required': 'Password is required'}),
    email: Joi.string().pattern(regexp.email).required().messages({'any.required': 'Email is required'}),
    subscription: Joi.string().valid(...Object.values(constants.descrUser)),
});