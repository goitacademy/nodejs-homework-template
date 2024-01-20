const Joi = require("joi");
const userInputSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(?\d{3}\)?\d{7}$/)
    .required(),
});

module.exports = {
  userInputSchema,
};
