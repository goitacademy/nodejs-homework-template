const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+?[\d\s-]+$/)
    .required(),
});

module.exports = {
  addSchema,
};
