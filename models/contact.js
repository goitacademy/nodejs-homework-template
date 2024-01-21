const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
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
contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `Missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `Missing required phone field`,
  }),
  favorite: Joi.boolean(),
});
const addSchemaPut = Joi.object({
  name: Joi.string().messages({
    "any.required": `Missing required name field`,
  }),
  email: Joi.string().messages({
    "any.required": `Missing required email field`,
  }),
  phone: Joi.string().messages({
    "any.required": `Missing required phone field`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean(),
});

const schemas = { addSchema, addSchemaPut, updateFavoriteSchemas };

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};