const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schemaCreate = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(
    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    "numbers"
  ),
});

const schemaUpdate = Joi.object({
  favorite: Joi.boolean().required(),
}).length(1);

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "contacts" }
);

const Contact = model("contact", contact);

module.exports = { Contact, schemaCreate, schemaUpdate };
