const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");

const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const phoneRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match: nameRegex,
    },
    email: { type: String, required: true },
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
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegex),
  favorite: Joi.boolean(),
});

module.exports = { Contact, joiSchema };
