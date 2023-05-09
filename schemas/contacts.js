const Joi = require("joi");

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
})
  .min(1)
  .messages({
    "object.min": "missing fields",
  });

const createSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
});

module.exports = {
  updateSchema,
  createSchema,
};
