const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");

// importing handleErrors from helpers
const { handleErrors } = require("../helpers/handeErrors");

// Joischema for validating contact info
const contactObjectSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

// Joischema for updating contact info
const contactObjectUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

// Joischema for updating ONLY "favorite" field using PATCH route
const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

// JoiSchemas grouped for import
const JoiSchemas = {
  contactObjectSchema,
  contactObjectUpdateSchema,
  contactUpdateFavoriteSchema,
};

// mongoose schema for  contacts_db
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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
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
