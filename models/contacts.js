const { Schema, model } = require("mongoose");
const joi = require("joi");

const contactSchema = new Schema(
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

const addSchema = joi.object({
  name: joi.string(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: joi.string().required(),
  favorite: joi.boolean().default(false),
});

const updateFavorite = joi.object({
  favorite: joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  addSchema,
  updateFavorite,
  Contact,
};
