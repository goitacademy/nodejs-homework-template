const Joi = require("joi");

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .required()
    .pattern(emailRegExp)
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/)
    .messages({ "any.required": "missing required phone field" }),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegExp),
  phone: Joi.string().pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/),
})
  .or("name", "email", "phone")
  .required();

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

module.exports = {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteSchema,
};
