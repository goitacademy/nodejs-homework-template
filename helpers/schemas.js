const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(15).required(),
});

const putSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().min(6).required(),
  phone: Joi.string().min(6).required(),
}).or("name", "email", "phone");

module.exports = {
  addSchema,
  putSchema};