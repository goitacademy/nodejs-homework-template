const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.number().required(),
});
const putSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.number(),
});

module.exports = {
  postSchema,
  putSchema,
};
