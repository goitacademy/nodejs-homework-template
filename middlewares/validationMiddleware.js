const Joi = require("joi");
const { ValidationError } = require("../helpers");

const addContactValidateMiddleware = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(new ValidationError("missing required field"));
  }

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9-]+$/)
      .min(7)
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details[0].message));
  }

  next();
};

const updateContactValidateMiddleware = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(new ValidationError("missing fields"));
  }

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3),
    email: Joi.string().email(),
    phone: Joi.string()
      .pattern(/^[0-9-]+$/)
      .min(7),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details[0].message));
  }

  next();
};

const validateUpdateContactStatus = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details[0].message));
  }

  next();
};

const validateUser = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const schema = Joi.object({
    password: Joi.string().alphanum().min(5).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().pattern(/^(starter|pro|business)$/),
    token: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details[0].message));
  }

  next();
};

const validateSubscription = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const schema = Joi.object({
    subscription: Joi.string().pattern(/^(starter|pro|business)$/),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError("Error subscription type"));
  }

  next();
};

module.exports = {
  addContactValidateMiddleware,
  updateContactValidateMiddleware,
  validateUpdateContactStatus,
  validateUser,
  validateSubscription,
};
