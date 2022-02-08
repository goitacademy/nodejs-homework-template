const Joi = require("joi");

function validateAddedContact(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required,
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }).required,
    phone: Joi.number().min(10).max(10).required,
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  next();
}

function validateUpdatedContact(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number().min(10).max(10),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error);
  }
  next();
}

module.exports = {
  validateAddedContact,
  validateUpdatedContact,
};
