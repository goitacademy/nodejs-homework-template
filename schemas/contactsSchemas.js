const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .required()
    .pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/)
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/)
    .messages({ "any.required": "missing required phone field" }),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
  phone: Joi.string().pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/),
})
  .or("name", "email", "phone")
  .required();

module.exports = {
  contactAddSchema,
  contactUpdateSchema,
};
