const Joi = require('joi');
const mongoose = require('mongoose');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.number().integer().min(3).max(9999999999).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),

  phone: Joi.number().integer().min(3).max(9999999999).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .optional(),
}).or('name', 'phone', 'email');

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    console.log(err);
    next({ status: 400, message: err.message.replace(/"/g, "'") });
  }
};

module.exports = {
  validationCreateContact: async (req, res, next) => {
    return await validate(schemaCreateContact, req.body, next);
  },
  validationUpdateContact: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next);
  },
  validationUpdateStatusContact: async (req, res, next) => {
    return await validate(schemaUpdateStatusContact, req.body, next);
  },
  validationObjectId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({ status: 400, message: 'Invalid Object Id ' });
    }
    next();
  },
};
