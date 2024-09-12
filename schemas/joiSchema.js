const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string(),
  email: Joi.string(),
  favorite: Joi.boolean(),
});

module.exports = {
  schema,
};
