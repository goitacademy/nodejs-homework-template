const Joi = require('joi');
const mongoose = require('mongoose');

const nameRegExp = '^[-\\s\\.A-Za-z]*$';
const phoneRegExp = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\.0-9]{7,12}$';

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .pattern(new RegExp(nameRegExp))
        .min(2)
        .max(30)
        .required(),

    phone: Joi.string()
        .pattern(new RegExp(phoneRegExp))
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: true } }),

    favorite: Joi.boolean()
})
    .with('name', 'phone');

const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .pattern(new RegExp(nameRegExp))
        .min(1)
        .max(30),

    phone: Joi.string()
        .pattern(new RegExp(phoneRegExp )),

    email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: true } }),

    favorite: Joi.boolean()
});

const schemaUpdateStatusContact  = Joi.object({
    favorite: Joi.boolean().required()
});

const isMongoIdValid = (req,next) => {
    {
        if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
          return next({
            status: 400,
            message: 'Invalid ObjectId',
          });
        };
        next();
    };
};

const validate = async (schema, obj, next)=>{
    try {
        await schema.validateAsync(obj);
        next();
    }
    catch (err) { 
        next({
            status: 400,
            message: err.message.replace(/"/g, '')
        });
    };
};

module.exports = {
    validateCreateContact: (req,res,next)=>validate(schemaCreateContact,req.body,next),
    validateUpdateContact: (req,res,next)=>validate(schemaUpdateContact,req.body,next),
    validateUpdateStatusContact: (req,res,next)=>validate(schemaUpdateStatusContact, req.body,next),
    validateMongoId: (req, res, next) => isMongoIdValid(req,next)
};