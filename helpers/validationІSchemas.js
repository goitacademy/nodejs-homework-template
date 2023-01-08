const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: [Joi.string().max(15).required(), Joi.number()],
});

const putSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: [Joi.string().max(15).optional(), Joi.number()],
});

module.exports = {
  postSchema,
  putSchema,
};
