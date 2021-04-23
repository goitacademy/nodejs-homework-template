const Joi = require('joi')

const schemaCreateContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().pattern(new RegExp('^[(][0-9]{3}[)] [0-9]{3}[-][0-9]{4}$')).optional()
    
})

const schemaUpdateEmail = Joi.object({
    // name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    // phone: Joi.number().max('^[(][0-9]{3}[)] [0-9]{3}[-][0-9]{4}$').optional()
}).or('email')

const schemaUpdateALL = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: Joi.string().pattern(new RegExp('^[(][0-9]{3}[)] [0-9]{3}[-][0-9]{4}$')).optional()
})

const validate = async (schema, obj, next)=>{
    try {
        const value = await schema.validateAsync(obj);
        return next()
    } catch (error) {
        next(error)
    }
}


module.exports = {
    ValidCreateContact: async (req,res,next)=>{
        return await validate(schemaCreateContact, req.body , next)
    },
    ValidUpdateEmailContact: async (req,res,next)=>{
        return await validate(schemaUpdateEmail, req.body, next)
    },
    ValidUpdateAllContact: async (req,res,next)=>{
        return await validate(schemaUpdateALL, req.body, next)
    }
}