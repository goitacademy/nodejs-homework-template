const Joi = require('joi');

const schemaContact = Joi.object({
  isFavorite: Joi.boolean().optional(),
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(11).max(15).required(),
});

const schemaStatusContact = Joi.object({
  isFavorite: Joi.boolean().required(),
});

const pattern = '\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}';
const schemaId = Joi.object({
  id: Joi.string().pattern(new RegExp(pattern)).required()
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: `Filed ${err.message.replace(/"/g, '')}`,
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaStatusContact, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};