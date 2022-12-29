const Joi = require('joi');
const {httpError} = require('../helpers');

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net', 'ua']},
    }),
    phone: Joi.number().greater(5).integer().positive(),
  });

  const {error} = schema.validate(req.body);

  if (error) {
    return next(httpError(400, error.message));
  }

  next();
};

const putContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: {allow: ['com', 'net', 'ua']},
        })
        .optional(),
    phone: Joi.number().greater(5).integer().positive().optional(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({status: validationResult.error.details});
  }

  next();
};

module.exports = {
  addContactValidation,
  putContactValidation,
};
