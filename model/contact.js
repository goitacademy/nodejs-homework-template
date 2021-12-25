const { Schema, model } = require("mongoose");
const Joi = require("joi");

const namePattern =
  /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const phonePattern =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match: namePattern,
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true, match: phonePattern },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(namePattern),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phonePattern),
  favorite: Joi.boolean(),
});

module.exports = { Contact, joiSchema };
