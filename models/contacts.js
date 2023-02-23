const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleErrors } = require("../helpers/handeErrors");

const contactObjectSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const contactObjectUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const JoiSchemas = {
  contactObjectSchema,
  contactObjectUpdateSchema,
  contactUpdateFavoriteSchema,
};

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
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

contactSchema.post("save", handleErrors);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  JoiSchemas,
};
