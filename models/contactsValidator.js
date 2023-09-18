const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const validateContact = (data) => {
  return contactSchema.validate(data);
};

module.exports = {
  validateContact,
};
