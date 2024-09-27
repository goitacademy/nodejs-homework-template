const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string()
            .min(5)
            .max(30)
            .required(),
    email: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net', 'org', 'ru', 'ua'] }
            })
            .pattern(
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
            )
            .required(),
    phone: Joi.string()
            .pattern(
                /^(\+?\d+)?\s*(\(\d+\))?[\s-]*([\d-]*)$/
            )
            .required(),
})

module.exports = {
    addSchema,
}