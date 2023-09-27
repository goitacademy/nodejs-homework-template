const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationError } = require("../helpers");

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
  {
    versionKey: false,
  }
);

contactSchema.post("save", handleSchemaValidationError);

const Contact = model("contact", contactSchema);

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const updateFavoriteScheme = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  contactsAddSchema,
  updateFavoriteScheme,
};

module.exports = {
  Contact,
  schemas,
};
