const Joi = require("joi");

const { HttpError } = require("../helpers");

const addContactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactsSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or("name", "email", "phone");

const addContactsValidation = (req, _, next) => {
  const { error } = addContactsSchema.validate(req.body);
  if (error) {
    const path = error.details[0].path;
    throw HttpError(400, `Missing required ${path} field`);
  }
  next();
};

const updateContactsValidation = (req, _, next) => {
  const { error } = updateContactsSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing fields");
  }
  next();
};

module.exports = {
  addContactsValidation,
  updateContactsValidation,
};
