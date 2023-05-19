const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

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
      required: [true, "Set phone number for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
contactSchema.post("save", handleMongooseError);
const Contact = model("contact", contactSchema);

const addScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { Contact, addScheme, updateFavScheme };
