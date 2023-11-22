const Joi = require('joi');

const  joiUserSchemas = Joi.object({
    password: Joi.string().min(8).required(),
    email: Joi.string().min(8).required(),
    subscription: Joi.string().required(),
    token: Joi.string().required(),
})

module.exports = joiUserSchemas;