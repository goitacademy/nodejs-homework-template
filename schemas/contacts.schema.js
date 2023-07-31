const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({ 'any.required': "missing required name field" }),
    email: Joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({ 'any.required': "missing required email field" }),
    phone: Joi
        .string()
        .regex(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must have 10 digits.',
            'any.required': "missing required phone field"
        }),
    favorite: Joi
        .boolean()
})

const contactByFieldSchema = (fieldName) => {
    const result = contactSchema
        .fork(Object.keys(contactSchema.describe().keys), (schema) => schema.optional())
        .fork(fieldName, (schema) => schema.required().messages({
            'any.required': `missing required ${fieldName} field`
        }))

    return result
}

module.exports = { contactSchema, contactByFieldSchema }