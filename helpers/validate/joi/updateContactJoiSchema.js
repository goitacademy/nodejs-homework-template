const Joi = require("joi");

const updateContactJoiSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email().trim(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

module.exports = updateContactJoiSchema;
