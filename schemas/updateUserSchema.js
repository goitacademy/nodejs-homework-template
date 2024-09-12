const Joi = require('joi');

const subList = ['starter', 'pro', 'business'];

const updateUserSchema = Joi.object({
    subscription: Joi.string().valid(...subList).required(),
})

module.exports = updateUserSchema