const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = new Schema(
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

const schemaCreate = Joi.object({
  name: Joi.string().min(0).required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const schemaPath = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", schema);

module.exports = { Contact, schemaCreate, schemaPath };
