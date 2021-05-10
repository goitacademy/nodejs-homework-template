const Joi = require('joi')

const schemaCreateContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    // eslint-disable-next-line
    phone: Joi.string().pattern(new RegExp('^[(][0-9]{3}[)] [0-9]{3}[-][0-9]{4}$')).optional()
    
})

const schemaQueryContact = Joi.object({
    sortBy: Joi.string().valid('name', 'email', 'phone').optional(),
    sortByDesc: Joi.string().valid('name', 'email', 'phone').optional(),
    filter: Joi.string().optional(),
    limit: Joi.number().integer().min(2).max(20).optional(),
    offset: Joi.number().integer().min(0).optional(),
    favorite: Joi.boolean().optional(),
    
}).without('sortBy', 'sortByDesc')

const schemaUpdateStatus = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemaUpdateALL = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    // eslint-disable-next-line
    phone: Joi.string().pattern(new RegExp('^[(][0-9]{3}[)] [0-9]{3}[-][0-9]{4}$')).optional()
})

const validate = async (schema, obj, next)=>{
    try {
        // eslint-disable-next-line
        const value = await schema.validateAsync(obj);
        return next()
    } catch (error) {
        next(error)
    }
}


module.exports = {
    ValidQueryContact: async (req, res, next) => {
        return await validate(schemaQueryContact, req.query, next)
    }, 
    ValidCreateContact: async (req,res,next)=>{
        return await validate(schemaCreateContact, req.body , next)
    },
    ValidUpdateStatus: async (req,res,next)=>{
        return await validate(schemaUpdateStatus, req.body, next)
    },
    ValidUpdateAllContact: async (req,res,next)=>{
        return await validate(schemaUpdateALL, req.body, next)
    }
}