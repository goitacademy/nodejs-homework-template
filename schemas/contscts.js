const Joi = require("joi");

const primarySchema = Joi.object({
  name: Joi.string().min(1).max(50).trim().required(),
  phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
    .min(7)
    .max(14)
    .required(),
  email: Joi.string().email().required(),
});

const secondarySchema = Joi.object({
  name: Joi.string().min(1).max(50).trim().optional(),
  phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
    .min(7)
    .max(14)
    .optional(),
  email: Joi.string().email().optional(),
});
module.exports = {
  secondarySchema,
  primarySchema,
};
