const mongoose = require("mongoose");
const Joi = require("joi");

const { Schema, model } = mongoose;

const contactSchema = new Schema({
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const ContactsList = model("Contacts", contactSchema);

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-z,A-Z,0-9, ,-]+$/)
    .min(2)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9, ,(),+,-]+$/)
    .min(9)
    .max(20)
    .required(),
  favorite: Joi.boolean().default(false),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = {
  ContactsList,
  schemas,
};
