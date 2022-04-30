const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegExp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

const contactShema = Schema(
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
      required: [true, "Set phone for contact"],
      match: phoneRegExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(phoneRegExp)
    .message("Enter the phone number in the format: (111) 222-3333")
    .required(),
  favorite: Joi.boolean().default(false),
});

const Contact = model("contact", contactShema);

module.exports = {
  contactShema,
  joiContactSchema,
  Contact,
};
