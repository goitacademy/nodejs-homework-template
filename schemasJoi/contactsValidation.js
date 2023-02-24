const Joi = require("joi");
const { validator } = require("../middlewares");

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
  favorite: Joi.boolean().optional(),
});

const putSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(5).optional(),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactPostValidator = validator(postSchema);
const contactPutValidator = validator(putSchema);
const favoriteJoiSchema = validator(favoriteSchema);

module.exports = {
  contactPostValidator,
  contactPutValidator,
  favoriteJoiSchema,
};
