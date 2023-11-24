const joi = require('joi')

const createContactSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    phone: joi.string().required()
})

const updateContactSchema = joi.object({
    name: joi.string().min(3).max(30),
    email: joi.string().email(),
    phone: joi.string()
})

module.exports = {createContactSchema, updateContactSchema}