const Joi = require('joi');

exports.bodySchemaCreate = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required().messages({"any.required": "missing required name field"}),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({"any.required": "missing required email field"}),
    phone: Joi.string().min(14).max(14).required().messages({"any.required": "missing required phone field"}),
});

exports.bodySchemaUpdate = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required().messages({"any.required": "missing required name field"}),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({"any.required": "missing required email field"}),
    phone: Joi.string().min(14).max(14).required().messages({"any.required": "missing required phone field"}),
});