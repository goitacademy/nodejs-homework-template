const Joi = require("joi");

const { ValidationError } = require("../helpers/errors");

const patternName = /^[a-zA-Z0-9_ ]*$/;
const paternPhone = /^[0-9()-_ ]*$/;

const postValidationContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .pattern(new RegExp(patternName))
      .required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(new RegExp(paternPhone)).required(),
    favorite: Joi.boolean(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }

  next();
};

const putBodyValidation = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    next(new ValidationError("missing fields"));
  }

  next();
};

const putValidationContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .pattern(new RegExp(patternName))
      .optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(new RegExp(paternPhone)).optional(),
    favorite: Joi.boolean().optional(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }

  next();
};

const patchBodyValidation = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    next(new ValidationError("missing field favorite"));
  }

  next();
};

const patchValidationContact = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }

  next();
};

module.exports = {
  postValidationContact,
  putBodyValidation,
  putValidationContact,
  patchBodyValidation,
  patchValidationContact,
};
