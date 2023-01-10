const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = {
  contactAddSchema,
};
