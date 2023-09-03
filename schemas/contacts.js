const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
});

module.exports = {
  schema,
};
