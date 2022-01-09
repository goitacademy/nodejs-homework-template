const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");
const { phoneRegex, nameRegex, emailRegex } = require("../config/constants");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match: nameRegex,
    },
    email: { type: String, required: true, match: emailRegex },
    phone: { type: String, required: true, match: phoneRegex },
    favorite: { type: Boolean, default: false },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(nameRegex),
  email: Joi.string().email().pattern(emailRegex),
  phone: Joi.string().pattern(phoneRegex),
  favorite: Joi.bool(),
});

module.exports = { Contact, joiSchema };
