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
        })
})

const contactValidate = (req, res, next) => {
    const { error } = contactSchema.validate(req.body);

    if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: "missing fields" })

    }

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next();
}

module.exports = {
    contactValidate
}