const { Schema, model } = require("mongoose");
const Joi = require("joi");

const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegexp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      match: [
        nameRegexp,
        "Name can only consist of letters, apostrophes, dashes and spaces.",
      ],
      required: [true, "This field is required"],
    },
    email: {
      type: String,
      required: [true, "This field is required"],
    },
    phone: {
      type: String,
      match: [
        phoneRegexp,
        "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
      ],
      required: [true, "This field is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactsSchemaJoi = Joi.object({
  name: Joi.string()
    .regex(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name can only consist of letters, apostrophes, dashes and spaces."
    )
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
    )
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteStatusSchemaJoi = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  contactsSchemaJoi,
  updateFavoriteStatusSchemaJoi,
  Contact,
};
