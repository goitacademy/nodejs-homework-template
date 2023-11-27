const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .messages({
      "any.required": "missing required name field",
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "any.required": "missing required email field",
    })
    .required(),
  phone: Joi.string()
    .min(5)
    .max(15)
    .messages({
      "any.required": "missing required phone field",
    })
    .required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(5).max(15),
})
  .min(1)
  .messages({ "object.min": "missing fields" });

module.exports = { addSchema, updateSchema };
