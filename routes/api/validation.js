const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'co'] },
    })
    .required(),
  phone: Joi.string().min(5).max(30).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'co'] },
    })
    .optional(),
  phone: Joi.string().min(5).max(30).optional(),
});

const validate = async (schema, body, next) => {
  try {
    if (Object.keys(body).length !== 0) {
      console.log(body);
      await schema.validateAsync(body);
      next();
    } else {
      next({ status: 400, message: `Fields are missing` });
    }
  } catch (err) {
    next({ status: 400, message: `Field ${err.message.replace(/"/g, '')}` });
  }
};

module.exports.validateAddContact = (req, _res, next) => {
  return validate(schemaAddContact, req.body, next);
};

module.exports.validateUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
