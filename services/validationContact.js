const Joi = require('joi')

const schemaForContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({
            tlds: {
                allow: false
            }
        })
        .required(),
    phone: Joi.string()
        .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
        .required(),
    favorite: Joi.boolean()
})

const validate = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        console.log(error)
        return next({
            status: 400,
            message: 'Bad request'
        })
    }
    next()
}

module.exports.validateContact = (req, _res, next) => {
    return validate(schemaForContact, req.body, next)
}