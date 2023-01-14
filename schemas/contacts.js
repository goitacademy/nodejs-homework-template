const Joi = require('joi');

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d\d\d\) \d\d\d-\d\d\d\d$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

const putSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^\(\d\d\d\) \d\d\d-\d\d\d\d$/)
    .optional(),
}).min(1);

const patchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  postSchema,
  putSchema,
  patchSchema,
};
