const Joi = require("joi");
const mongoose = require("mongoose");

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),

  favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),

  favorite: Joi.boolean().optional(),
}).or("name", "email", "phone", "favorite");

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    console.log(err);
    next({ status: 400, message: err.message.replace(/"/g, "'") });
  }
};

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  validateAddContact: async (req, res, next) => {
    return await validate(schemaAddContact, req.body, next);
  },

  validateUpdateStatusContact: async (req, res, next) => {
    return await validate(schemaUpdateStatusContact, req.body, next);
  },

  validateObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({
        status: 400,
        message: "Invalid id",
      });
    }
    next();
  },

  validateUpdateContact: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next);
  },
};
