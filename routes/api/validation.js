const Joi = require('joi');

const schemaCreate = Joi.object({
  name: Joi.string().min(2).max(30).required(),

  email: Joi.string().email({ minDomainSegments: 2 }).required(),

  phone: Joi.string().pattern(new RegExp('^[0-9]{10,13}$')).required(),

  favorite: Joi.boolean().optional(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().min(2).max(30).optional(),

  email: Joi.string().email({ minDomainSegments: 2 }).optional(),

  phone: Joi.string().pattern(new RegExp('^[0-9]{10,13}$')).optional(),

  favorite: Joi.boolean().optional(),
}).min(1);

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: `Field: ${err.message.replace(/"/g, '')}` });
  }
};

module.exports.validateCreate = (req, _res, next) => {
  return validate(schemaCreate, req.body, next);
};

module.exports.validateUpdate = (req, _res, next) => {
  return validate(schemaUpdate, req.body, next);
};

module.exports.validateUpdateStatus = (req, _res, next) => {
  return validate(schemaUpdateStatus, req.body, next);
};
