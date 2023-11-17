const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});
const contactsSchema = new Schema({
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
contactsSchema.post("save", handleMongooseError);
const updateFavorite = Joi.object({ favorite: Joi.boolean().required() });
const Contact = model("contact", contactsSchema);
module.exports = {
  Contact,
  addSchema,
  updateFavorite,
};
