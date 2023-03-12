const Joi = require("joi");

function validateAddedContact(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required,
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }).required,
    phone: Joi.number().min(10).max(10).required,
    favorite: Joi.bool().default(false).required(),
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
    favorite: Joi.bool().default(false),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  next();
}

const validateFavField = (req, res, next) => {
  const favSchema = Joi.object({
    favorite: Joi.bool().default(false).required(),
  });
  const { error } = favSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};
module.exports = {
  validateAddedContact,
  validateUpdatedContact,
  validateFavField,
};
