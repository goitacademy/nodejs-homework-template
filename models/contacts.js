const { Schema, model } = require("mongoose");
const joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const validationEmail =
  /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const validationPhone =
  /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: {
      type: String,
      unique: true,
      match: validationEmail,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      match: validationPhone,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().pattern(validationEmail).required(),
  phone: joi.string().pattern(validationPhone).required(),
  favorite: joi.boolean(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
