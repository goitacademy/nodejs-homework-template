const Joi = require("joi");

const shcemasOpt = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = { shcemasOpt };
