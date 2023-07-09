const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const contactSchema = new Schema({
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
});

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().regex(/^\d+$/).required(),
  favorite: Joi.boolean().required(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
    });

const schemas = { contactSchema, addSchema, updateFavoriteSchema,};

const Contact = model("Contact", contactSchema);

module.exports = { Contact, schemas };
