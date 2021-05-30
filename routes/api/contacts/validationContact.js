const Joi = require('joi');
const mongoose = require('mongoose');

const addingContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string().length(10).required(),
});

const updatingContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string().length(10).optional(),
});

const contactUpdateFavoriteStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validation = async (schema, contactObj, next) => {
  try {
    await schema.validateAsync(contactObj);
    return next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

const queryContactsShema = Joi.object({
  sortBy: Joi.string().valid('name', 'email', 'phone', 'favorite').optional(),
  sortByDesc: Joi.string()
    .valid('name', 'email', 'phone', 'favorite')
    .optional(),
  filter: Joi.string().valid('name', 'email', 'phone', 'favorite').optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
  page: Joi.number().integer().min(0).optional(),
  favorite: Joi.boolean().optional(),
}).without('sortBy', 'sortByDesc');

const validationStatus = async (schema, contactObject, next) => {
  const { favorite } = contactObject;
  try {
    await schema.validateAsync({ favorite });
    return next();
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};

module.exports = {
  validationQueryContact: async (req, res, next) => {
    return await validation(queryContactsShema, req.query, next);
  },
  addValidationContact: async (req, res, next) => {
    return await validation(addingContactSchema, req.body, next);
  },
  updateValidationContact: async (req, res, next) => {
    return await validation(updatingContactSchema, req.body, next);
  },
  validationUpdateContactFavoriteSatus: async (req, res, next) => {
    return await validationStatus(
      contactUpdateFavoriteStatusSchema,
      req.body,
      next
    );
  },
  validationObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({
        status: 400,
        message: 'Invalid ObjectId',
      });
    }
    next();
  },
};
