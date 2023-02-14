const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require("joi");

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const contactSchema = new Schema(
    {
      name: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 30,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [emailRegExp, "Please fill a valid email address"],
      },
      phone: {
        type: String,
        match: [phoneRegExp, "Please fill a valid phone number"],
        require: true,
        unique: true,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
    },
    { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const contactsWRequiredSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(emailRegExp).required().messages({
    "string.pattern.base": `Please fill a valid email address`,
  }),
  phone: Joi.string().pattern(phoneRegExp).required().messages({
    "string.pattern.base": `Please fill a valid phone number`,
  }),
  favorite: Joi.boolean(),
});

const contactsWORequiredSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().pattern(emailRegExp).messages({
        "string.pattern.base": `Please fill a valid email address`,
    }),
    phone: Joi.string().pattern(phoneRegExp).messages({
        "string.pattern.base": `Please fill a valid phone number`,
    }),
    favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
    contactsWORequiredSchema,
    contactsWRequiredSchema,
    favoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
