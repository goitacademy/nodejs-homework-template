const Joi = require("joi");
const { Schema, model } = require("mongoose");

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
  { versionKey: false, timestamps: false }
);

contactSchema.post("save", (error, _, next) => {
  error.status =
    error.name === "ServerError" && error.code === 11000 ? 409 : 400;
  next();
});

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateAfterChangeContact = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactsSchema,
  updateAfterChangeContact,
  favoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
