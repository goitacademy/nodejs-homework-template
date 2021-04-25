const Joi = require('joi');
const mongoose = require('mongoose');

const validAddContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),

    favorite: Joi.bool()
    .optional()
});

const validUpdateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .optional(),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).optional(),

    favorite: Joi.bool().optional()
    
}).or('name', 'email', 'phone', 'favorites');

const validUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
})

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        return next()
    } catch (err) {
        console.log(err)
        next({ status: 400, message: err.message })
    }
};

module.exports = {
    validAddContact: async (req, res, next) => {
        return await validate(validAddContact, req.body, next)
    },
    validUpdateContact: async (req, res, next) => {
        return await validate(validUpdateContact, req.body, next)
    },
    validUpdateStatusContact: async (req, res, next) => {
        return await validate(validUpdateStatusContact, req.body, next)
    },
    validObjectId: async (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
            return next({ status: 400, message: 'Invalid Object Id' })
        }
        next()
    },
};