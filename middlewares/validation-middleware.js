const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

const validationContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).trim(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }

  next();
};

module.exports = {
  validationContact,
};
