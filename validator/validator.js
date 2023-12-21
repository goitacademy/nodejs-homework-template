const Joi = require("joi");

const schemaAdd = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().trim().required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email().trim(),
  phone: Joi.string().trim(),
}).min(1);

module.exports = {
  schemaAdd,
  schemaUpdate,
};
