const Joi = require('joi');

const verify = Joi.object({
    email: Joi.string().required()
})

module.exports = verify;