const Joi = require('joi')
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const schemaCreateContact = Joi.object({
    name: Joi.string().alphanum().min(4).max(50).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10,12}$'))
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(4).max(50).optional(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: myCustomJoi.string().phoneNumber({ defaultCountry: 'UA', format: 'international' })
})

// const schemaCreateContact = Joi.object({
//     name: Joi.string().alphanum().min(4).max(50).optional(),
//     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
//     phone: myCustomJoi.string().phoneNumber({ defaultCountry: 'UA', format: 'international' })
// })

const validate = (schema, obj, next) =>{
    const {error} = schema.validate(obj)
    if(error){
        const [{message}] = error.details
        return next({
            status:400,
            message: `Filed ${message.replace(/"/g, '')}`
        })
    }

    next()
}

module.exports.createContact = (req, res, next) =>{
    return validate(schemaCreateContact, req.body, next)
}

module.exports.updateContact = (req, res, next) =>{
    return validate(schemaUpdateContact, req.body, next)
}