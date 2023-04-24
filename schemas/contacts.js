const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9 ()-]+$/)
    .required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().lowercase(),
  phone: Joi.string().regex(/^[0-9 ()-]+$/),
}).or("name", "phone", "email");

const updateStatusContactSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
};
