const Joi = require('joi');
const { ValidateContactName } = require('../config/constant');

Joi.objectId = require('joi-objectid')(Joi);

const schemaContacts = Joi.object({
  name: Joi.string()
    .min(ValidateContactName.MIN_NAME)
    .max(ValidateContactName.MAX_NAME)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
});

const schemaContactsChange = Joi.object({
  name: Joi.string()
    .min(ValidateContactName.MIN_NAME)
    .max(ValidateContactName.MAX_NAME)
    .optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean().optional(),
});

const schemaId = Joi.object({
  contactId: Joi.objectId().required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(400).json({
      status: 'error',
      code: 400,
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
