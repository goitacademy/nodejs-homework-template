const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "gmail"] },
        })
        .required(),
      phone: Joi.string().alphanum().min(5).max(12).required(),
      favorite: Joi.boolean(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },

  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "gmail"] },
        })
        .required(),
      phone: Joi.string().alphanum().min(5).max(12).required(),
      favorite: Joi.boolean(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },

  favoriteValidation: (req, res, next) => {
    const schema = Joi.object({ favorite: Joi.boolean().required() });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    next();
  },
  userValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
      subscription: Joi.string().alphanum(),
      token: Joi.string(),
    });
    const validateUser = schema.validate(req.body);
    if (validateUser.error) {
      return res.status(400).json({ message: `${validateUser.error}` });
    }
    next();
  },
  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
    });
    const validateLogin = schema.validate(req.body);
    if (validateLogin.error) {
      return res.status(400).json({ message: `${validateLogin.error}` });
    }
    next();
  },
  subscriptionValidation: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.string().valid("starter", "pro", "business").required(),
    });
    const validateLogin = schema.validate(req.body);
    if (validateLogin.error) {
      return res.status(400).json({ message: `${validateLogin.error}` });
    }
    next();
  },
  verifyEmailSchema: (req, res, next) => {
    const schema = Joi.object({ email: Joi.string().required() });
    const verifyEmail = schema.validate(req.body);
    if (verifyEmail.error) {
      return res.status(400).json({ message: "missing required field email" });
    }
    next();
  },
};
