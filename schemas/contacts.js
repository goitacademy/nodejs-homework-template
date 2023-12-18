const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .email()
    .min(6)
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .min(8)
    .required()
    .messages({ "any.required": "missing required phone field" }),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().min(8),
})
  .min(1)
  .messages({ "object.min": "missing fields" });

module.exports = { addSchema, updateSchema };
