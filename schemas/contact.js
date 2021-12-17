const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().required("Missing required name field"),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required("Missing required name field"),
  phone: Joi.number().integer().required("Missing required name field"),
});

module.exports = joiSchema;
