const Joi = require('joi');

const { ValidationError } = require('../helpers/errors');

const postValidation = (req, res, next) => {
  const validationSchemaPOST = Joi.object({
    name: Joi.string().alphanum().min(3).max(15),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    phone: Joi.string()
      .max(12)
      // eslint-disable-next-line
      .pattern(/^\d[\d\(\)\ -]{4,14}\d$/)
      .required(),
    favorite: Joi.boolean(),
  });
  const dataValidate = validationSchemaPOST.validate(req.body);
  if (dataValidate.error) {
    next(new ValidationError(JSON.stringify(dataValidate.error.message)));
  }
  next();
};

const patchValidation = (req, res, next) => {
  const validationSchemaPATCH = Joi.object({
    name: Joi.string().alphanum().min(3).max(15),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    phone: Joi.number().max(12),
    favorite: Joi.boolean(),
  }).min(1);
  const dataValidate = validationSchemaPATCH.validate(req.body);

  if (dataValidate.error) {
    next(new ValidationError(dataValidate.error.message));
  }
  next();
};
module.exports = {
  postValidation,
  patchValidation,
};
