const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
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

const contactSchemaJoi = Joi.object({
  name: Joi.string().min(2).max(30).alphanum().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .pattern(/^\((\d{3})\)[ ](\d{3})[-](\d{4})$/)
    .messages({
      "string.pattern.base": `missing required phone field. Phone number example: (992) 914-3792`,
    }),
  favorite: Joi.boolean(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  contactSchemaJoi,
};
