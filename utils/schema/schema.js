const joi = require("joi");

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().lowercase().required(),
  phone: joi
    .string()
    .regex(/^[0-9 ()-]+$/)
    .required(),
});

const updateSchema = joi.object({
  name: joi.string(),
  email: joi.string().email(),
  phone: joi.string(),
});

module.exports = {
  addSchema,
  updateSchema,
};
