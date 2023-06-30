const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/)
    .required(),
});
module.exports = {
  addSchema,
};
