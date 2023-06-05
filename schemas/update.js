const Joi = require("joi");

const updateSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" missing fields`,
    "string.empty": `"name" cannot be an empty field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" missing fields`,
    "string.empty": `"email" cannot be an empty field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" missing fields`,
    "string.empty": `"phone" cannot be an empty field`,
  }),
})
  .min(1)


module.exports = updateSchema;