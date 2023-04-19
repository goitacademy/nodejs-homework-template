const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
});

module.exports = {
  addSchema,
};
