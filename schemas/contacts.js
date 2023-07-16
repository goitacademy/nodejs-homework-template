const Joi = require("joi");

const emptySchema = Joi.object()
  .min(1)
  .messages({ "object.min": "Missing fields" });

const contactSchema = Joi.object({
  name: Joi.string().min(5).max(26).required().messages({
    "any.required": "missing required name field",
    "string.pattern.base": "Wrong pattern",
  }),

  phone: Joi.string()
    .pattern(
      new RegExp("^[+]?[(]?[0-9]{1,4}[)]?[-s.]?[0-9]{1,4}[-s.]?[0-9]{1,6}$")
    )
    .required()
    .messages({
      "any.required": "missing required phone field",
      "string.pattern.base": "Wrong pattern",
    }),

  email: Joi.string()
    .pattern(new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"))
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.pattern.base": "Wrong pattern",
    }),
});

module.exports = {
  emptySchema,
  contactSchema,
};
