const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .replace(/[^\d]+/g, "")
    .min(10)
    .max(10)
    .required(),
});

module.exports = {
  addSchema,
};
