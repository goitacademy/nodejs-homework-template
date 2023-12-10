const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
});

module.exports = {
    addSchema,
}