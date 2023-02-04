const Joi = require("joi");

module.exports = {
  usersSignUnValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().min(5).max(30).required(),
      email: Joi.string().min(5).max(30).required(),
      subscription: Joi.string(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ status: 400, message: validationResult.error.details });
    }
    next();
  },
  usersLogInValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().min(5).max(30).required(),
      email: Joi.string().min(5).max(30).required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ status: 400, message: validationResult.error.details });
    }
    next();
  },
  userVerificationValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().min(5).max(30).required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ status: 400, message: validationResult.error.details });
    }
    next();
  },
};
