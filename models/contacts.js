const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactsSchema = new Schema(
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

const addSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email({ tlds: false }).required(),
  phone: Joi.string()
    .pattern(/^\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})$/)
    .required(),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const schemas = {
  add: addSchema,
  updateFavorite: updateFavoriteSchema,
};

const Contact = model("contact", contactsSchema);

module.exports = {
  Contact,
  schemas,
};
