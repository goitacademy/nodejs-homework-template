const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

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
contactSchema.post("save", handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().trim().min(7).required(),
  favorite: Joi.bool(),
});

const updateSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  phone: Joi.string().trim().min(7),
  favorite: Joi.bool(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const joi = { addSchema, updateSchema, favoriteSchema };
const Contact = model("contact", contactSchema);

module.exports = {
  joi,
  Contact,
};
