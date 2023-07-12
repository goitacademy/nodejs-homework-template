const Joi = require("joi");

const joiConfig = Joi.object({
  favorite: Joi.boolean().required()
});

module.exports = joiConfig;