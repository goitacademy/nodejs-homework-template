const Joi = require("joi");

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `missing required name field`
    }),
    email: Joi.string().min(3).email().required().messages({
      "any.required": `missing required email field`
    }),
    phone: Joi.string().min(10).required().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/).messages({
      "any.required": `missing required phone field`
    }),
  });

  module.exports = {contactAddSchema}; 