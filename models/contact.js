const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, " Set name for contacts"],
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

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});

const joiFavoriteSchema = Joi.object({
  favorite: Joi.boolean().default(false),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, joiFavoriteSchema };
