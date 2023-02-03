const Joi = require("joi");
const {ValidationError} = require("../helpers/errors");

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  favorite: Joi.boolean().default(true),
  owner: Joi.string()
});

const schemaPutContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  phone: Joi.string().min(3).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .optional(),
  favorite: Joi.boolean().optional()
});

const schemaPatchContact = Joi.object({ 
  favorite: Joi.boolean().required()
});

const addContactValidation = (req, res, next) => {
  const { error } = schemaAddContact.validate(req.body);
  if (error) {
    next(new ValidationError(error.details)); // json.stringify
  }
  next();
};

const putContactValidation = (req, res, next) => {
  const { error } = schemaPutContact.validate(req.body);
  if (error) {
    next(new ValidationError(error.details)); // json.stringify
  }
  next();
};

const patchContactValidation = (req, res, next) => {
  const { error } = schemaPatchContact.validate(req.body);
  if (error) {
    next(new ValidationError(error.details)); // json.stringify
  }
  next();
};

module.exports = {
  addContactValidation,
  putContactValidation,
  patchContactValidation
};
