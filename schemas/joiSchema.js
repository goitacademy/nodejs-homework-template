const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

module.exports = {
  schema,
};
