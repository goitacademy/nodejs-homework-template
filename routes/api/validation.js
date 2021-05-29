const Joi = require('joi');
const mongoose = require('mongoose');

const validateAddContact = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}/)
    .optional(),
  favorite: Joi.boolean().optional(),
}).or('email', 'phone');

const validateUpdateContact = Joi.object({
  name: Joi.string().trim().min(2).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}/)
    .optional(),
  favorite: Joi.boolean().optional(),
}).or('name', 'email', 'phone', 'favorite');

const validateUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: 400,
      message: error.message.replace(/"/g, ''),
    });
  }
};

module.exports = {
  validationAddedContact: (req, res, next) => {
    return validate(validateAddContact, req.body, next);
  },
  validationUpdatedContact: (req, res, next) => {
    return validate(validateUpdateContact, req.body, next);
  },
  validateUpdateFavorite: (req, res, next) => {
    return validate(validateUpdateFavorite, req.body, next);
  },
  validateMongoId: (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.contactId)) {
      next({
        status: 400,
        message: 'Invalid id.',
      });
    }
    next();
  },
};
