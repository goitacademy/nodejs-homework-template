const joi = require("joi");

const addSchema = joi.object({
  name: joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),

  email: joi.string().required().messages({
    "any.required": `Missing required email field`,
  }),

  phone: joi.string().required().messages({
    "any.required": `Missing required phone field`,
  }),
});

module.exports = {
  addSchema,
};
