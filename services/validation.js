const Joi = require('joi');

const postSchema = Joi.object({
  name: Joi.string()
        .min(3)
        .max(30)
        .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
  phone: Joi.number().min(2).required()
});

const putSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number().min(2)
});

module.exports = {
    postSchema,
    putSchema

}