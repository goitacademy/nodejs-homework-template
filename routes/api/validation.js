const Joi = require('joi');

const patterns = {
  name: /^[\w\sа-яА-Я]+$/,
  phone:
    /^(?:\+\s?\d{1,2}\s?)?(?:\(\d{1,4}\)|\d{1,4})?\s?\d+([-\s/.]?)(?:\d\1?)+\d$/,
  id: /^[\da-f]{24}$/,
};

const schemaContact = Joi.object({
  name: Joi.string().min(3).max(30).pattern(patterns.name).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(patterns.phone).required(),
  favorite: Joi.boolean().optional(),
});

const schemaContactPatch = Joi.object({
  name: Joi.string().min(3).max(30).pattern(patterns.name).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(patterns.phone).optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

const schemaContactStatusPatch = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaContactId = Joi.object({
  contactId: Joi.string().pattern(patterns.id).required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: `Error: ${err.message.replace(/"/g, "'")}`,
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateContactPatch = async (req, res, next) => {
  return await validate(schemaContactPatch, req.body, res, next);
};

module.exports.validateContactStatusPatch = async (req, res, next) => {
  return await validate(schemaContactStatusPatch, req.body, res, next);
};

module.exports.validateContactId = async (req, res, next) => {
  return await validate(schemaContactId, req.params, res, next);
};
