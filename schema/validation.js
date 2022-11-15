const Joi = require("joi");

const schemaPost = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {allow: ["com", "net"]},
  }),
  phone: Joi.number().required(),
  favorite: Joi.boolean().optional(),
});

const schemaPut = Joi.object({
  name: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,

    tlds: {allow: ["com", "net"]},
  }),
  phone: Joi.number(),
  favorite: Joi.boolean(),
});

const schemaPatch = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = {schemaPost, schemaPut, schemaPatch};
