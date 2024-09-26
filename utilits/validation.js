const Joi = require("joi");

const postSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const putSchema = Joi.object().min(1);

module.exports = {
  postSchema,
  putSchema,
};