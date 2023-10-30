const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9()-\s]+$/)
    .required(),
});

module.exports = {
  addSchema,
};
