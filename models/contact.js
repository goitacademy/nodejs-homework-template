const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 2,
      maxlength: 10,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      index: true,
      unique: [true, "Phone must be unique"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().alphanum().min(3).max(10).required(),
});

const patchSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string().alphanum().min(3).max(10).optional(),
});

const Contact = model("contact", contactSchema);

Contact.createIndexes();

module.exports = { Contact, postSchema, patchSchema };
