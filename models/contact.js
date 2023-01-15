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
    favourite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(7).required(),
  favourite: Joi.boolean().default(false),
});

// schema for PATCH
const favJoiSchema = Joi.object({
  favourite: Joi.boolean().default(false).required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favJoiSchema,
};
