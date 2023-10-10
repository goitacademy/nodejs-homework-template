const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
});

module.exports = {
  addSchema,
};
