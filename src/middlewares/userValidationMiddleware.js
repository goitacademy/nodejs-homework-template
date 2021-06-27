const Joi = require('joi');

const { RegistrationValidationError } = require('../helpers/errors');

const userSignupValidation = (req, res, next) => {
  const validationSchemaPOST = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    password:
      Joi.string().max(12)
        .required(),
  });
  const dataValidate = validationSchemaPOST.validate(req.body);
  if (dataValidate.error) {
    next(
      new RegistrationValidationError(
        JSON.stringify(dataValidate.error.message)
      )
    );
  }
  next();
};
module.exports = {
  userSignupValidation,
};
