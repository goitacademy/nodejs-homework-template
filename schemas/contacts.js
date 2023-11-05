const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/)
    .required(),
});

module.exports = {
  addSchema,
};
