const Joi = require('joi');
const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+38-\d{3}-\d{3}-\d{2}-\d{2}$/)
    .required(),
});

module.exports = {
  addSchema,
};
