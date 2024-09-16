const Joi = require("joi");

const scheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}).messages({ "any.required": "missing required {#key} field" });


module.exports = scheme;