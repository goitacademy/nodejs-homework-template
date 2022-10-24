const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactsSchema = Schema(
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

const Contact = model("contact", contactsSchema);

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .min(5)
    .max(45),
  phone: Joi.string().min(5).max(15).required(),
  favorite: Joi.bool().valid(true, false),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().valid(true, false).required(),
});

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};
