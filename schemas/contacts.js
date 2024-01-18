const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `Missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `Missing required phone field`,
  }),
});

const addSchemaPut = Joi.object({
  name: Joi.string().messages({
    "any.required": `Missing required name field`,
  }),
  email: Joi.string().messages({
    "any.required": `Missing required email field`,
  }),
  phone: Joi.string().messages({
    "any.required": `Missing required phone field`,
  }),
  favorite: Joi.boolean().messages({
    "any.required": `Missing required favorite field`,
  })
});

module.exports = {
  addSchema,
  addSchemaPut,
};