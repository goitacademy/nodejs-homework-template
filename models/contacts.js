const { Schema, model } = require("mongoose");
const Joi = require("Joi");
const { handleMongooseError } = require("../helpers");

const contactsScheme = new Schema({
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
});

contactsScheme.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const updateFavoriteScheme = Joi.object({
  favorite: Joi.boolean().required(),
});
const schemes = {
  addSchema,
  updateFavoriteScheme,
};
const Contact = model("contact", contactsScheme);

module.exports = {
  Contact,
  schemes,
};
