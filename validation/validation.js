const Joi = require('joi');
const { Types } = require('mongoose');
const { HttpCode, Subscription } = require('../helpers/constants');

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
    })
    .required(),

  phone: Joi.string()
    .pattern(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/)
    .required(),
});

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
    }).optional(),

  phone: Joi.string()
    .pattern(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/)
    .optional(),
});

const schemaCreateUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
  password: Joi.string().alphanum().min(6).max(30).required(),
});

const schemaUpdateUserSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(Subscription))
    .required(),
});

const schemaResendVerificationEmail = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
});

const validate = (schema, body, next) => {
  if (Object.keys(body).length === 0) {
    return next({ status: HttpCode.BAD_REQUEST, message: 'missing fields' })
  }
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({ status: HttpCode.BAD_REQUEST, message })
  }
  next()
}

const validateCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

const validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}

const validateObjectId = (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.contactId)) {
    return next(new CustomError(HttpCode.BAD_REQUEST, 'Invalid id'));
  }
  next();
};

const validateUpdateStatusContact = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(
      new CustomError(HttpCode.BAD_REQUEST, 'missing field favorite')
    );
  }
  return validate(schemaUpdateStatusContact, req.body, next);
};

const validateCreateUser = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new CustomError(HttpCode.BAD_REQUEST, ' missing fields'));
  }
  return validate(schemaCreateUser, req.body, next);
};

const validateUpdateUserSubscription = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(
      new CustomError(HttpCode.BAD_REQUEST, 'missing field subscription')
    );
  }
  return validate(schemaUpdateUserSubscription, req.body, next);
};

const validateResendVerificationEmail = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(
      new CustomError(statusCode.BAD_REQUEST, 'missing required field email')
    );
  }
  return validate(schemaResendVerificationEmail, req.body, next);
};

module.exports = {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  validateObjectId,
  validateCreateUser,
  validateUpdateUserSubscription,
  validateResendVerificationEmail
}
