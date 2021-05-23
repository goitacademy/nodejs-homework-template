const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string().min(4).max(30).required(),
  phone: Joi.string().min(10).required(),
  id: ["uuidv3", "uuidv4", "uuidv5"],

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru"] },
    })
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(4).max(30).optional(),
  phone: Joi.string().min(10).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru"] },
    })
    .optional(),
});

const schemaRemoveContact = Joi.object({
  id: Joi.string().alphanum().required(),
});

const schemagetContactById = Joi.object({
  id: Joi.string().alphanum().required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);

    next();
  } catch (err) {
    next({ status: "fail", code: 500, message: err.message });
  }
};

module.exports.validateAddContact = (req, _res, next) => {
  return validate(schemaAddContact, req.body, next);
};

module.exports.validateUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports.validatesRemoveContact = (req, _res, next) => {
  return validate(schemaRemoveContact, req.params.id, next);
};

module.exports.validatesGetContactById = (req, _res, next) => {
  return validate(schemagetContactById, req.params.id, next);
};
