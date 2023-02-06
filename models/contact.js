const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleErrors } = require("../helpers");

const contactSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
// Add contact schema
const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});
// Update  field schema
const updateFavoriteFieldSchema = Joi.object({
  favorite: Joi.bool().required(),
});

contactSchema.post("save", handleErrors);

const schemas = {
  addContactSchema,
  updateFavoriteFieldSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };