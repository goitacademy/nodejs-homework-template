const Joi = require('joi');

const { ValidationError } = require('../helpers/errors');

const userDataValidation = (req, res, next) => {
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
      new ValidationError(
        JSON.stringify(dataValidate.error.message)
      )
    );
  }
  next();
};
module.exports = {
  userDataValidation,
};
