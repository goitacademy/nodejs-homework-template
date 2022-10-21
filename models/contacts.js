const { Schema, model, SchemaTypes } = require("mongoose");
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
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
});

const Contact = model("contact", contactSchema);

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsPatchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactsAddSchema,
  contactsPatchSchema,
};

module.exports = {
  Contact,
  schemas,
};
