const Joi = require("joi");
const { ValidationError } = require("../../helpers/errors");

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    }),
    phone: Joi.number().greater(5).integer().positive(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new ValidationError(error.message));
  }

  next();
};

module.exports = addContactValidation;
