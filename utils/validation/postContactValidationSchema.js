const Joi = require("joi");

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    email: Joi.string().required(),
    phone: Joi.number().integer().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.json({ message: "missing required field" });
  }
  return next();
};
const changeContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string(),
    phone: Joi.string().min(5).max(14),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.json({ message: "missing required field" });
  }
  return next();
};

const updateStatusValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.bool().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.json({ message: "missing favorite field" });
  }
  return next();
};

module.exports = {
  addContactValidation,
  updateStatusValidation,
  changeContactValidation,
};
