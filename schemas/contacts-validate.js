const Joi = require("joi");

const addContactSchema = Joi.object({
  name:Joi.string().min(3).required().messages({
    "any.required": "you should provide title!!",
  }),
  email: Joi.string().min(3).required().messages({
    "any.required": "you should provide title!!",
  }),
  phone: Joi.string().min(3).required().messages({
    "any.required": "you should provide title!!",
  }),
});

module.exports = {
  addContactSchema,
};
