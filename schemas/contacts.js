const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name"`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required "email"`,
    "string.base": `"email" must be string`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required "phone"`,
  }),
});

module.exports = {
  addSchema,
};
