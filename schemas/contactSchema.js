const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+?[\d\s()-]+$/)
    .required(),
  favorite: Joi.boolean(),
});
const updateContactSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+?[\d\s()-]+$/),
});
const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const contactSchema = {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
};
module.exports = contactSchema;
