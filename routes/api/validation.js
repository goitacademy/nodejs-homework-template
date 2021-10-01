const Joi = require('joi');

const schemaContacts = Joi.object({
  name: Joi.string().min(1).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const schemaContactsChange = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
});

const patternId = '\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}';

const schemaId = Joi.object({
  contactId: Joi.string().pattern(new RegExp(patternId)).required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Field ${err.message.replace(/"/g, '')}`,
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContacts, req.body, res, next);
};

module.exports.validateContactsChange = async (req, res, next) => {
  return await validate(schemaContactsChange, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
