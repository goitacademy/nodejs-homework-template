const Joi = require("joi");

const addContactValid = (req, res, next) => {
  const contactContSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string()
      .min(2)
      .max(20)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().min(6).max(12).required(),
  });
  const { error } = contactContSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

const validatePatch = (req, res, next) => {
  const updContSchema = Joi.object({
    name: Joi.string().min(2).max(20),
    email: Joi.string()
      .min(2)
      .max(20)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    phone: Joi.string().min(6).max(12),
  });
  const { error } = updContSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

module.exports = {
  addContactValid,
  validatePatch,
};
