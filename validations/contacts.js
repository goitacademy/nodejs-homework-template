const Joi = require("joi");
const { HttpError } = require("../helpers");

const validateNewContact = (req, res, next) => {
  const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const { error } = addSchema.validate(req.body);
  if (error) {
    const requiredField = error.message
      .replace(`"`, "")
      .replace('" is required', "");
    throw HttpError(400, `missing required ${requiredField} field`);
  }
  next();
};

const validateUpdatedContact = (req, res, next) => {
  const updateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });
  const { error } = updateSchema.validate(req.body);
  if (!Object.keys(req.body).length) {
    throw HttpError(400, `missing fields`);
  }
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = { validateNewContact, validateUpdatedContact };
