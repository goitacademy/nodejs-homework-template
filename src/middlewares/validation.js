const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

const postValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().integer().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details));
  }

  next();
};

const putValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.number().integer().optional(),
  }).min(1);

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details));
  }

  next();
};

module.exports = {
  postValidation,
  putValidation,
};
