const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoone: Joi.string().min(5).required(),
});

const postValidator = (postSchema) => (body) => {
  return postSchema.validate(body);
};

const contactPostValidator = postValidator(postSchema);

const putSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phoone: Joi.string().min(5).optional(),
});

const validator = (putSchema) => (body) => {
  return putSchema.validate(body);
};

const contactPutValidator = validator(putSchema);

module.exports = { contactPostValidator, contactPutValidator };
