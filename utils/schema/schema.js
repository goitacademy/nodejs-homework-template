const joi = require("joi");

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().lowercase().required(),
  phone: joi
    .string()
    .regex(/^[0-9 ()-]+$/)
    .required(),
});

module.exports = {
  addSchema,
};
