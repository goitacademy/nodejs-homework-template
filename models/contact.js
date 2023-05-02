const { Schema, model } = require("mongoose");
<<<<<<< HEAD
const { handleMongooseError } = require("../helpers");
=======
const {handleMongooseError} = require("../helpers");
>>>>>>> 22513394b068499e24accb9e01491fc86a886f58
const Joi = require("joi");
// для валідації при додавані до json

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
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
<<<<<<< HEAD
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    owner: {
      type: Schema.Types.ObjectId,
      //зберігається Id яку генерує mongodb
      ref: "user",
      //з якої колекції Id
      required: true,
    },
=======
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
>>>>>>> 22513394b068499e24accb9e01491fc86a886f58
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);
// помилка з неправельним форматом

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

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema); // модель що працює з колекцією

module.exports = {
  Contact,
  addSchema,
  putSchema,
  updateFavoriteSchema,
};
