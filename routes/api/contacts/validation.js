const Joi = require("joi");
const mongoose = require("mongoose");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().alphanum().min(10).max(10).optional(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),

  phone: Joi.string().alphanum().min(10).max(10).optional(),
  favorite: Joi.boolean().optional(),
}).or("name", "email", "phone", "favorite");

const schemaUpdateFavoriteContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};

module.exports = {
  validationCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
  },
  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
  validationUpdateFavorite: (req, res, next) => {
    return validate(schemaUpdateFavoriteContact, req.body, next);
  },
  validateMongoId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({
        status: 400,
        message: "Invalid ObjectId",
      });
    }
    next();
  },
};
