const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    "any.required": `"name" must be exist`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "any.required": `"email" must be exist`,
      "string.base": `"email" must be string`,
    })
    .email(),
  phone: Joi.string().required().messages({
    "any.required": `"phone" must be exist`,
  }),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).messages({
    "any.required": `"name" must be exist`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string()
    .min(3)
    .max(50)
    .messages({
      "any.required": `"email" must be exist`,
      "string.base": `"email" must be string`,
    })
    .email(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .messages({
      "any.required": `"phone" must be exist`,
    }),
});

module.exports = {
  addSchema,
  updateSchema,
};
