const Joi = require('joi')

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
  
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'ua', 'net', 'ru',] } }),

        phone: Joi.number()
        .integer()
        .min(7)
        .max(10),
})

const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
  
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'ua', 'net', 'ru',] } }),

        phone: Joi.number()
        .integer()
        .min(7)
        .max(10),
}).or('name', 'email', 'phone') 


const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        return next()
    } catch (err) {
        console.log(err)
        next({ status: 400, message: err.message.replace(/"/g, "'") })
    }
}

module.exports = {
   validationCreateContact: async (req, res, next) => {
        return await validate(schemaCreateContact, req.body, next)
    },
   validationUpdateContact: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next)
}
   
}
