const { Schema, model } = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require("joi");
// для валідації при додавані до json

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 15,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      min: 8,
      max: 30,
      match: /^\(\d{3}\)\d{2}-\d{2}-\d{3}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);
//помилка з неправельним форматом

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "'email' should be a type of string",
      "string.email": "field 'email' must be a valid email",
      "any.required": "missing required field 'email'",
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\d{2}-\d{2}-\d{3}$/)
    .trim()
    .required()
    .messages({
      "string.base": "'phone' should be a type of string",
      "string.empty": "'phone' must contain value",
      "any.required": "missing required field 'phone'",
    }),
  favorite: Joi.boolean(),
});

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.base": "'email' should be a type of string",
      "string.email": "field 'email' must be a valid email",
      "any.required": "missing required field 'email'",
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\d{2}-\d{2}-\d{3}$/)
    .trim()
    .messages({
      "string.base": "'phone' should be a type of string",
      "string.empty": "'phone' must contain value",
      "any.required": "missing required field 'phone'",
    }),
  favorite: Joi.boolean(),
}).or("name", "email", "phone", "favorite");

const Contact = model("contact", contactSchema); // модель що працює з колекцією

module.exports = {
  Contact,
  addSchema,
  putSchema,
};
