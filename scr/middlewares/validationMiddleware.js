const Joi = require("joi");
const { ValidationError, WrongBodyError } = require("../helpers/errors");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.string().min(13).required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      if (validationResult.error.details[0].type === "any.required") {
        const [text] = validationResult.error.details[0].path;
        next(new WrongBodyError(`missing required ${text} field`));
      } else {
        next(new ValidationError(validationResult.error.details[0].message));
      }
    }

    next();
  },
  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).optional(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .optional(),
      phone: Joi.string().min(13).optional(),
    }).min(1);
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      if (validationResult.error.details[0].type === "object.min") {
        next(new ValidationError("missing fields"));
      } else {
        next(new ValidationError(validationResult.error.details[0].message));
      }
    }

    next();
  },
  updateStatusValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      if (validationResult.error.details[0].type === "any.required") {
        next(new ValidationError("missing field favorite"));
      } else {
        next(new ValidationError(validationResult.error.details[0].message));
      }
    }

    next();
  },
  postUserValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().min(6).required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }

    next();
  },
  patchUserSubscriptionValidation: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.string()
        .allow("starter", "pro", "business")
        .only()
        .required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }

    next();
  },
};
