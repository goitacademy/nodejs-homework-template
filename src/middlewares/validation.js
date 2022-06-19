const Joi = require("joi");
const { ValidationError } = require("./helpers/errors");

module.exports = {
  addFieldValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string()
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .min(7)
        .max(17)
        .required(),
      favorite: Joi.boolean(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      const [errorMessage] = error.details;
      throw new ValidationError(`${errorMessage.message}`);
    }
    next();
  },

  updateFieldValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string()
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .min(7)
        .max(17),
      favorite: Joi.boolean(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      const [errorMessage] = error.details;
      throw new ValidationError(`${errorMessage.message}`);
    }
    next();
  },
};
