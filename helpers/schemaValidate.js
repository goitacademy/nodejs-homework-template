const Joi = require("joi");
const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().email().required(),
  email: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required(),
});
module.exports = addSchema;
