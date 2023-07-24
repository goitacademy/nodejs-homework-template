const Joi = require('joi');

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(1).required(),
  email: Joi.string().email({minDomainSegments: 2}).required(),
  phone: Joi.number().required(),
});
const putSchema = Joi.object({
  name: Joi.string().alphanum().min(1),
  email: Joi.string().email({minDomainSegments: 2}),
  phone: Joi.number(),
});

module.exports = {
  postSchema,
  putSchema,
};
