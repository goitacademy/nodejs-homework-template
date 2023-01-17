const { Schema, SchemaTypes, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const putContactSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  email: Joi.string(),
  phone: Joi.string().min(10).max(13),
});

const postContactSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(10).max(13).required(),
});

const patchContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contacts = model("contact", contactSchema);

module.exports = {
  Contacts,
  postContactSchema,
  putContactSchema,
  patchContactSchema,
};
