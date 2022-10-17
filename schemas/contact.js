const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  phone: Joi.string().min(6).max(15).required(),
});

module.exports = {
  addSchema,
};
