const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const updateSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
});

module.exports = {
  addSchema,
  updateSchema,
};
