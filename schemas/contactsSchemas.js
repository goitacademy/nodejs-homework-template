const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  phone: Joi.string()
    .required()
    .pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/)
    .messages({ "any.required": "missing required phone field" }),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string().pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/),
})
  .or("name", "phone")
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
