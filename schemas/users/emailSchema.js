const Joi = require('joi');

const emailRegexp = require('../../utils/regexp/emailRegexp');

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
}).messages({
    'any.required': 'missing required field email',
});

module.exports = emailSchema;
