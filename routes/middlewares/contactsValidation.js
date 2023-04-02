const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
    "string.empty": `name field cannot be empty`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
    "string.empty": `email field cannot be empty`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
    "string.empty": `phone field cannot be empty`,
  }),
});

const updateSchema = Joi.object({
  name: Joi.string().min(1),
  email: Joi.string().email(),
  phone: Joi.string().min(1),
})
  .min(1)
  .messages({
    "object.min": "missing fields",
  });

module.exports = {
  addSchema,
  updateSchema,
};
