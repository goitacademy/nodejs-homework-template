const Joi = require("joi");

const postContactJoiSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

module.exports = postContactJoiSchema;
