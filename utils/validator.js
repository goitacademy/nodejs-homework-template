const joi = require('joi');

const addContactSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().required()
})

const validator = (schema) => (body) => {
    return schema.validate(body, { abortEarly: false });
}

const addContactValidate = validator(addContactSchema);

module.exports = { addContactValidate };