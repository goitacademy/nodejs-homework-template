const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2}).required(),
    phone: Joi.string().max(12).pattern(/^[0-9]+$/).required(),
 });

module.exports = contactSchema;

    //    name: Joi.string().min(5).max(25).required(),
    // phone: Joi.string()
    //     .pattern(/^[0-9-]+$/)
    //     .max(12)
    //     .required(),
    // email: Joi.string().required(),

    //    name: Joi.string().alphanum().min(3).max(30).required(),
    // email: Joi.string().email({ minDomainSegments: 2}).required(),
    // phone: Joi.string().max(12).pattern(/^[0-9]+$/).required(),