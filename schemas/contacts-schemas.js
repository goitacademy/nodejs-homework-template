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
    "any.required": `"email" must be exist`,
    "string.base": `"email" must be string`,
  }),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50),
  email: Joi.string().min(3).max(50).email(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
});

module.exports = {
  addSchema,
  updateSchema,
};
