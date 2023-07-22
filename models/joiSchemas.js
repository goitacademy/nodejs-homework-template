
const Joi = require("joi");
const joiPhoneNumber = require("joi-phone-number");
const myCustomJoi = Joi.extend(joiPhoneNumber);

const signUserSchema = Joi.object({
    email: Joi.string()
    .email()
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.base": "Email must be a string",
      "string.empty": "missing required email field",
      "string.email": "Email must be a valid email address",
    }),
    password: Joi.string()
    .min(6)
    .required()
    .messages({
      "any.required": "missing required password field",
      "string.base": "Password must be a string",
      "string.empty": "missing required password field",
      "string.email": "Password must be a valid string",
    }),
});


const addSchema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .required()
      .messages({
        "any.required": "missing required name field",
        "string.base": "Name must be a string",
        "string.empty": "missing required name field",
        "string.min": "Name should have a minimum length of {#limit}",
      })
      ,
    email: Joi.string()
      .trim()
      .email()
      .required()
      .messages({
        "any.required": "missing required email field",
        "string.base": "Email must be a string",
        "string.empty": "missing required email field",
        "string.email": "Email must be a valid email address",
      }),
    // phone: Joi.string()
    //   .trim()
    //   .regex(/^\+?[()\-\d]+$/)
    //   .min(9)
    //   .max(16)
    //   .required()
    //   .messages({
    //     "any.required": "missing required phone field",
    //     "string.base": "Phone number must be a string",
    //     "string.empty": "missing required phone field",
    //     "string.pattern.base": "Phone number is invalid",
    //     "string.min": "Phone number should have a minimum length of {#limit}",
    //     "string.max": "Phone number should have a maximum length of {#limit}",
    //   }),
    phone: myCustomJoi.string().phoneNumber().required().messages({
      "any.required": "missing required phone field",
      "string.base": "Phone number must be a string",
      "string.empty": "missing required phone field",
      "string.pattern.base": "Phone number is invalid",
      "phoneNumber.invalid": "Phone number is invalid",
    }),
    favorite: Joi.boolean(),
  });
  

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
    .messages({
      "any.required": "missing field favorite"
    }),
  })

 module.exports = {
    signUserSchema,
    addSchema,
    updateFavoriteSchema,
 }