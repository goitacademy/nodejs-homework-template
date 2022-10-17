const { Schema, model } = require("mongoose");
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

const schemaCreate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  phone: Joi.string().min(6).max(15).required(),
  favorite: Joi.bool(),
});

const schemaPatch = Joi.object({
  favorite: Joi.bool().required("missing field favorite"),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemaCreate,
  schemaPatch,
};
