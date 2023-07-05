const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateFaforiteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemasJoi = { addSchema, updateFaforiteSchema };

module.exports = schemasJoi;
