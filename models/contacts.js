const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const contactsSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    favorite: { type: Boolean, default: false },
  },
  { versionKay: false, timestamps: true }
);

contactsSchema.post("save", handleMongooseError);

const schemaValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  schemaValidation,
  updateFavoriteSchema,
};

const Contact = model("contact", contactsSchema);

module.exports = { Contact, schemas };
