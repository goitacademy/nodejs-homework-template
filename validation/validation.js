const Joi = require("joi");
const PostContactShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
  favorite: Joi.boolean().default(false),
});

const UpdateContactShema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
  ),
  favorite: Joi.boolean().default(false),
}).or("name", "email", "phone", "favorite");

const UpdateStatusContactShema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
  ),
  favorite: Joi.boolean().default(false).required(),
}).or("name", "email", "phone", "favorite");

module.exports = {
  PostContactShema,
  UpdateContactShema,
  UpdateStatusContactShema,
};
