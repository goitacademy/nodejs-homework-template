const Joi = require("joi");
const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});
module.exports = { addSchema };
