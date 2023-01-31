const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Set phone for contact"],
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const addScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

const schemas = {
  addScheme,
  updateFavoriteScheme,
};

module.exports = {
  Contact,
  schemas,
};
