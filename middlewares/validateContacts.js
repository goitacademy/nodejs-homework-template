const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().max(30).required().messages({ "any.only": "Missing required name field" }),

  email: Joi.string().email().required().messages({ "any.only": "Missing required email field" }),

  phone: Joi.string().required().messages({ "any.only": "Missing required phone field" }),
}).with("name", "email", "phone");

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
const updateStatusSchema = Joi.object({
  favorite: Joi.boolean(),
});

const contactValidation = {
  addSchema,
  updateSchema,
  updateStatusSchema,
};

module.exports = contactValidation;
