const { Schema, model } = require("mongoose");

const joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");

const phoneRegexp = /^[\s(]*\d{3}[)\s]*\d{3}[\s-]?\d{2}[\s-]?\d{2}/;

// const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be exist"],
    },
    email: {
      type: String,
      required: [true, "Email must be exist"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone must be exist"],
      unique: true,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationErrors);

const contactAddJoiSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  favorite: joi.bool(),
  phone: joi.string().pattern(phoneRegexp).required(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.bool().required(),
});
const schemas = {
  contactAddJoiSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
