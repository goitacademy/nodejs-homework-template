const Joi = require("joi");

const addSchema = {
    name: Joi.string().required,
    email: Joi.string().required,
    phone: Joi.string().required,
  };

module.exports = {
    addSchema,
}  