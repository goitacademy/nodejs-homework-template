const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(40).required().messages({
    "any.required": "Missing required name field",
    "string.empty": "The name field cannot be empty",
  }),
  age: Joi.number().min(18).max(100).required().messages({
    "any.required": "Missing required name field",
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": "Missing required name field",
    "string.empty": "The name field cannot be empty",
  }),
  phone: Joi.string()
    .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .required()
    .messages({
      "any.required": "",
      "string.empty": "The phone field must be filled",
    }),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(40).required().messages({
    "any.required": "Missing fields",
    "string.empty": "The name field cannot be empty",
  }),
  age: Joi.number().min(18).max(100).required().messages({
    "any.required": "missing fields",
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": "Missing fields",
    "string.empty": "The name field cannot be empty",
  }),
  phone: Joi.string()
    .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .required()
    .messages({
      "any.required": "",
      "string.empty": "The phone field must be filled",
    }),
  favorite: Joi.boolean().optional(),
});

const schemaFavoriteContact = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({ "object.unknown": "missing field favorite" });

const schemaMongoId = Joi.object({
  contactId: Joi.objectId().required(),
});

module.exports = {
  schemaCreateContact,
  schemaUpdateContact,
  schemaMongoId,
  schemaFavoriteContact,
};
