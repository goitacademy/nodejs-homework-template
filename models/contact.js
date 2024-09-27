const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMogooseError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});

const updateSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  favorite: Joi.boolean().default(false),
});

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set numbers  for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMogooseError);

const Contact = model("contacts", contactSchema);

module.exports = { Contact, addSchema, updateSchema };
