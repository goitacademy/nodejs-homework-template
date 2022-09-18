const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ca", "uk"] },
      })
      .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const [{ context }] = validationResult.error.details;

    next(new ValidationError(`missing required ${context.label} field`));
  }

  next();
};

const putContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ca", "uk"] },
      })
      .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError("missing fields"));
  }

  next();
};

const updateStatusContactValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError("missing field favorite"));
  }

  next();
};

const usersValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ca", "uk"] },
      })
      .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const [{ context }] = validationResult.error.details;

    next(new ValidationError(`missing required ${context.label} field`));
  }

  next();
};

const updateUserSubscriptionValidation = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(`${validationResult.error.message}`));
  }

  next();
};

module.exports = {
  addContactValidation,
  putContactValidation,
  updateStatusContactValidation,
  usersValidation,
  updateUserSubscriptionValidation,
};
