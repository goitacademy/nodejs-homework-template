/* eslint-disable indent */
/* eslint-disable eol-last */
const Joi = require('joi')

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
})

module.exports = joiSchema