const { Schema, model } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const namePattern = /^[a-zA-Zа-яА-Я ]+$/;
const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phonePattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,20}(\s*)?$/;

const createContactJoiSchema = Joi.object({
  name: Joi.string().pattern(namePattern).min(2).max(30).required(),
  email: Joi.string().pattern(emailPattern).required(),
  phone: Joi.string().pattern(phonePattern).min(7).max(20).required(),
  favorite: Joi.bool(),
});

const updateContactJoiSchema = Joi.object({
  name: Joi.string().pattern(namePattern).min(2).max(30).optional(),
  email: Joi.string().pattern(emailPattern).optional(),
  phone: Joi.string().pattern(phonePattern).min(7).max(20).optional(),
  favorite: Joi.bool().optional(),
});

const favoriteContactJoiSchema = Joi.object({
  favorite: Joi.bool()
    .required()
    .messages({ "any.required": "Missing field favorite" }),
});

const contactJoiId = Joi.object({
  contactId: Joi.objectId().required(),
});

module.exports = {
  Contact,
  createContactJoiSchema,
  updateContactJoiSchema,
  favoriteContactJoiSchema,
  contactJoiId,
};
