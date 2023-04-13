const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: "string",
      required: [true, "Set name for contact"],
    },
    email: {
      type: "string",
      required: true,
    },
    phone: {
      type: "string",
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationErrors);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});
const schemas = {
  addSchema,
  updateFavoriteSchema,
};
module.exports = {
  Contact,
  schemas,
};
