const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
  favorite: Joi.boolean().optional(),
});

const postValidator = (postSchema) => (body) => {
  return postSchema.validate(body);
};

const contactPostValidator = postValidator(postSchema);

const putSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(5).optional(),
  favorite: Joi.boolean(),
});

const putValidator = (putSchema) => (body) => {
  return putSchema.validate(body);
};

const contactPutValidator = putValidator(putSchema);

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const favoriteValidator = (favoriteSchema) => (body) => {
  return favoriteSchema.validate(body);
};

const favoriteJoiSchema = favoriteValidator(favoriteSchema);

module.exports = {
  contactPostValidator,
  contactPutValidator,
  favoriteJoiSchema,
};
