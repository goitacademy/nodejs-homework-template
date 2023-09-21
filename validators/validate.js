const Joi = require("joi");

const phoneReg = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `name should be a type of 'text'`,
    "string.empty": `name cannot be an empty field`,
    "any.required": `missing required name field`,
  }),
  email: Joi.string().email().pattern(emailReg).required().messages({
    "string.base": `email should be a type of 'text'`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().pattern(phoneReg).required().messages({
    "string.base": `phone should be a type of 'text'`,
    "string.empty": `phone cannot be an empty field`,
    "any.required": `missing required phone field`,
  }),
  favorite: Joi.boolean().messages({
    "boolean.base": `favorite should be a type of 'boolean'`,
  }),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "boolean.base": `favorite should be a type of 'boolean'`,
    "any.required": `missing required favorite field`,
  }),
});

module.exports = {
  contactSchema,
  favoriteSchema,
};
