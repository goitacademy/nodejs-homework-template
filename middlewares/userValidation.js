const Joi = require("joi");

const { ValidationError } = require("../helpers/errors");

const patternPassword = /^[a-zA-Z0-9]{3,30}$/;

// eslint-disable-next-line no-lone-blocks
{
  /*

subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },

*/
}

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().pattern(new RegExp(patternPassword)).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }

  next();
};

module.exports = userValidation;
