/* eslint-disable semi */
/* eslint-disable quotes */
const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(18).required(),
  email: Joi.string().required(),
  phone: Joi.string()
    // .integer()
    // .min(10 ** 9)
    // .max(10 ** 10 - 1)
    .required(),
});

module.exports = joiSchema;
