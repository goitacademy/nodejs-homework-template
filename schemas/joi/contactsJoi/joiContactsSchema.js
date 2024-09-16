const Joi = require("joi");

// Joi schema
const addSchema = Joi.object({
  name: Joi.string().required().error(new Error("missing required name field")),
  email: Joi.string()
    .required()
    .error(new Error("missing required email field")),
  phone: Joi.string()
    .required()
    .error(new Error("missing required phone field")),
  favorite: Joi.boolean(),
});

module.exports = addSchema;
