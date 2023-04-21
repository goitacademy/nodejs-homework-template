const Joi = require("joi");
const { HttpError } = require("../helpers");

const addContactSchema = Joi.object({
  name: Joi.string()
    .required()
    .error(HttpError(400, "missing required name field")),
  email: Joi.string()
    .required()
    .error(HttpError(400, "missing required email field")),
  phone: Joi.string()
    .required()
    .error(HttpError(400, "missing required phone field")),
  favorite: Joi.boolean(),
});

module.exports = { addContactSchema };
