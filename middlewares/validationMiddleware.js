const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
});

const schemaPutContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  phone: Joi.string().min(3).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .optional(),
});

const addContactValidation = (req, res, next) => {
  const { error } = schemaAddContact.validate(req.body);
  if (error) {
    return res.status(400).json({ status: error.details });
  }
  next();
};

const putContactValidation = (req, res, next) => {
  const { error } = schemaPutContact.validate(req.body);
  if (error) {
    return res.status(400).json({ status: error.details });
  }
  next();
};

module.exports = {
  addContactValidation,
  putContactValidation,
};
