const Joi = require("joi");

const addPostSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});
const addPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number(),
}).min(1);

module.exports = {
  addPostSchema,
  addPutSchema,
};
