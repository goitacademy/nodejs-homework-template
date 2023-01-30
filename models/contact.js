const { Schema, model } = require("mongoose");

const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: [true, "You already have contact with this name"],
    },
    email: {
      type: String,
      unique: [true, "You already have contact with this email"],
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

const joiSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().min(10).max(14).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const favoriteSchema = Joi.object({
  favorite: Joi.string().valid("false", "true").required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteSchema,
};
