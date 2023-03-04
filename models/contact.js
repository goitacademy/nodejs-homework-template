const { Schema, model } = require('mongoose');
const Joi = require("joi");
const {handleMongooseError} = require("../helpers")

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set email for contact"]
  },
  phone: {
    type: String,
    required: [true, "Set phone number for contact"]
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true });

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post("save", handleMongooseError);
const Contact = model('contact', contactSchema);
const schemas = { addSchema, updateFavoriteSchema };

module.exports = { Contact, schemas };
