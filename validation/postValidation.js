const Joi = require('joi');
const createReject = require('../utils');

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string()
    .pattern('+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}')
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});

const postValidation = async (req, res, next) => {
  const validationResult = await schema.validateAsync(req.body);
  if (validationResult.error) {
    throw createReject(400, validationResult.error.details.message);
  }
  next();
};

module.exports = { postValidation };
