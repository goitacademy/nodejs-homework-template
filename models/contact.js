const { Schema, model } = require("mongoose");
const Joi = require("joi");

// const { handleMongooseError } = require("../middleware/handleMongooseError");

const phoneRegExp = /\(\d{3}\)\s\d{3}-\d{4}/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is reqired, use tamplate (111) 11-1111"],
      unique: true,
      match: phoneRegExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false }
);
// не працює, в запиті все одно status 500
// contactSchema.post("save", handleMongooseError);

const schemaCreateContact = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `"name" cannot be an empty field`,
    "string.base": `"name" should be a type of 'text'`,
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`,
  }),
  phone: Joi.string().pattern(phoneRegExp).required().messages({
    "string.empty": `"phone" cannot be empty`,
    "string.base": `"phone" must be string`,
    "string.pattern.base":
      "Invalid phone's format, enter you phone like this (111) 111-1111",
  }),
  favorite: Joi.boolean(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().messages({
    "string.empty": `"name" cannot be an empty field`,
    "string.base": `"name" should be a type of 'text'`,
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).messages({
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`,
  }),
  phone: Joi.string().pattern(phoneRegExp).messages({
    "string.empty": `"phone" cannot be empty`,
    "string.base": `"phone" must be string`,
    "string.pattern.base":
      "Invalid phone's format, enter you phone like this (111) 111-1111",
  }),
  favorite: Joi.boolean(),
});

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemaCreateContact,
  schemaUpdateContact,
  schemaUpdateStatusContact,
};
