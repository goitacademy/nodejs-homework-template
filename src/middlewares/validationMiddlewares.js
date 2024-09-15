const Joi = require("joi");
const {ValidationError} = require("../helpers/errors");

module.exports = {
  putValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.number().integer(),
      favorite: Joi.boolean(),
    });

    const validationResult = schema.validateAsync(req.body);

    if (validationResult.error) {
      next(new ValidationError(validationResult.error.message));
    }
     next(); 
    },
    

  patchValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().integer(),
      favorite: Joi.boolean(),
    });

    const validationResult = schema.validateAsync(req.body);

    if (validationResult.error) {
        next(new ValidationError(validationResult.error.message));
      }
    next();
  },

  patchFavoriteValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = schema.validate(req.body);
    if(validationResult.error) {
      next(new ValidationError(validationResult.error.message));
    }
    next();
  },
};