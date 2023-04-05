const joi = require("joi");

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const updateSchema = joi.object({
  name: joi.string(),
  email: joi.string(),
  phone: joi.string(),
});

module.exports = {
  addSchema,
  updateSchema,
};
