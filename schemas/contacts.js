const Joi = require("joi");

const schema = Joi.object({
  phone: Joi.string().required(),
  email: Joi.string().required(),
  name: Joi.string().required(),
});

module.exports = {
  schema,
};
