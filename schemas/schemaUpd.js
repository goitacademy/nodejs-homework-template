const Joi = require("joi");

const schemaUpd = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = {
  schemaUpd,
};
