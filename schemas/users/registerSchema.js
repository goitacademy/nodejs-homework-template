const Joi = require('joi');

const emailRegexp = require('../../utils/regexp/emailRegexp');

const registerSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

module.exports = registerSchema;
