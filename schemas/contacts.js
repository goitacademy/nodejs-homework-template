const Joi = require("joi")

const addSchema = Joi.object({
    name: Joi.string()
    .trim()
    .min(2)
    .max(10)
    .required()
    .messages({
      'string.base': `"name" must be a string`,
      'string.empty': `"name" cannot be an empty field`,
      'string.min': `"name" should have a minimum length of {#limit}`,
      'any.required': `missing required "name" field`
    }),


    email: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': `"email" should be a type of 'text'`,
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `missing required "email" field`,
      "string.email": `"email" must be a valid email address`,
    }),



    phone: Joi.string()
    .trim()
    .regex(/^\+?[()\-\d]+$/)
    .min(9)
    .max(16)
    .required()
    .messages({
      "any.required": `missing required "phone" field`,
      "string.base": `"phone" must be a string`,
      "string.empty": `"phone" cannot be an empty field`,
      "string.pattern.base": `"phone" number is invalid`,
      "string.min": `"phone" number should have a minimum length of {#limit}`,
      "string.max": `"phone" number should have a maximum length of {#limit}`,
    }),
  })


module.exports = {
    addSchema,
}


// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// })