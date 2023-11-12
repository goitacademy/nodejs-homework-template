const Joi = require("joi");

const addSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.number().required(),
});

module.exports = {
  addSchema,
};
