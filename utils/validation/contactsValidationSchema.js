const Joi = require('joi');

const createContactsValidationSchema = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    complited:Joi.boolean().required()
})

const updateContactsValidationSchema = Joi.object({
    title: Joi.string().min(2).max(30),
    complited:Joi.boolean().required()
}).or('title', 'completed')

module.exports = (createContactsValidationSchema, updateContactsValidationSchema);