const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const statusSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  schema,
  statusSchema,
};
