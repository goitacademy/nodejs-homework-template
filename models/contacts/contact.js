const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleSchemaErrors } = require("../../helpers");

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
  { versionKey: false }
);

contactSchema.post("save", handleSchemaErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const updateFavouriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  addSchema,
  updateFavouriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
