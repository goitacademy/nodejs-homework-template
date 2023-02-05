const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { ValidationErrror } = require("../helpers/errors");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.string().alphanum().min(2).max(15).required(),
      favorite: Joi.boolean().optional(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      next(new ValidationErrror(validationResult.error.message));
    }

    next();
  },

  changeContactValidation: (req, res, next) => {
    const bodySchema = Joi.object({
      name: Joi.string().alphanum().min(2).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.string().alphanum().min(2).max(15).required(),
      favorite: Joi.boolean().optional(),
    });

    const idSchema = Joi.objectId();

    const validationBodyResult = bodySchema.validate(req.body);
    const validationIdResult = idSchema.validate(req.params.contactId);

    if (validationBodyResult.error) {
      next(new ValidationErrror(validationBodyResult.error.message));
    }

    if (validationIdResult.error) {
      next(new ValidationErrror(validationIdResult.error.message));
    }

    next();
  },

  patchValidation: (req, res, next) => {
    const bodySchema = Joi.object({
      name: Joi.string().alphanum().min(2).max(20).optional(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .optional(),
      phone: Joi.string().alphanum().min(2).max(15).optional(),
      favorite: Joi.boolean().optional(),
    });

    const idSchema = Joi.objectId();

    const validationBodyResult = bodySchema.validate(req.body);
    const validationIdResult = idSchema.validate(req.params.contactId);

    if (validationBodyResult.error) {
      return res
        .status(400)
        .json({ message: validationBodyResult.error.message });
    }

    if (validationIdResult.error) {
      next(new ValidationErrror(validationIdResult.error.message));
    }

    next();
  },

  getContactValidation: (req, res, next) => {
    const idSchema = Joi.objectId();

    const validationIdResult = idSchema.validate(req.params.contactId);

    if (validationIdResult.error) {
      next(new ValidationErrror(validationIdResult.error.message));
    }

    next();
  },

  authUserValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      subscription: Joi.string().allow("starter", "pro", "business").optional(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      next(new ValidationErrror(validationResult.error.message));
    }

    next();
  },
};
