const Joi = require("joi");

const addSchema =  Joi.object({
    name: Joi.string()
      .required()
      .messages({
          "any.required": `missing required name`,
          "string.empty": `name cannot be empty`,
      }),
    email: Joi.string()
      .required()
      .email()
      .messages({
          "any.required": `missing required email`,
          "string.empty": `email cannot be empty`,
          "string.email": `email cannot be a valid email address`
      }),
    phone: Joi.string()
      .required()
      .regex(/^[0-9]{10}$/)
      .messages({
          "any.required": `missing required phone`,
          "string.empty": `phone cannot be empty`,
          'string.pattern.base': `Phone number must have 10 digits.`
      }),
})

const updateSchema =  Joi.object({
  name: Joi.string()
    .messages({
      "string.empty": `name cannot be empty`,
    }),
  email: Joi.string()
    .email()
    .messages({
      "string.empty": `email cannot be empty`,
      "string.email": `email cannot be a valid email address`
    }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({'string.pattern.base': `Phone number must have 10 digits.`})

})

module.exports = {
    addSchema,
    updateSchema
}