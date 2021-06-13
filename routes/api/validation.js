const Joi = require('joi');

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        email: Joi.string().email().optional(),
        phone: Joi.string().pattern(/[()][0-9]{3}[)] [0-9]{3}-[0-9]{4}/).optional()
    }).or('name', 'email', 'phone')

    const schemaUpdateContact = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
            email: Joi.string().email().optional(),
            phone: Joi.string().pattern(/[()][0-9]{3}[)] [0-9]{3}-[0-9]{4}/).optional()
        }).or('name', 'email', 'phone')
    

const validate = async (schema, obj, next) => {
    try {
         await schema.validateAsync(obj);
        next()
    } catch (err) { 
        next({
            status: 400,
            message: err.message.replace(/"/g, '')
        })
    }
} 

module.exports = {
    validationCreateContact: (req,res,next) => {
        return validate(schemaCreateContact, req.body, next)
    },
    validationUpdateContact: (req,res,next) => {
        return validate(schemaUpdateContact, req.body, next)
    },
}