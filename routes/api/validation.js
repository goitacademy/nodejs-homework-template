const Joi = require("joi");
const mongoose = require("mongoose");
const schemaCreateContact = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),

  age: Joi.number().integer().min(1900).max(2013),
  inArray: Joi.boolean().optional(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  age: Joi.number().integer().min(1900).max(2013).optional(),
  inArray: Joi.boolean().optional(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
}).or("name", "email", "inArray");

const schemaUpdateStatusContact = Joi.object({
  inArray: Joi.boolean().optional(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 404,
      message: err.message.replace(/"/g, ""),
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
  validationUpdateStatusContact: (req, res, next) => {
    return validate(schemaUpdateStatusContact, req.body, next);
  },
  validationMongoId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({
        status: 404,
        message: "Invalid ObjectId",
      });
    }
    next();
  },
};
