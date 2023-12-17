const { Schema, model } = require("mongoose");
const { hendleMongooseError } = require("../helpers");
const Joi = require("joi");

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
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", hendleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
    "string.base": "Name must be text",
  }),
  email: Joi.string().required().messages({
    "any.required": "Missing required email field",
    "string.base": "Email must be text",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required phone field",
    "string.base": "Phone must be text",
  }),
  favorite: Joi.boolean(),
});

const updateFavSchemas = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing required field favorite",
    "boolean.base": "Favorite must be boolean type",
  }),
});

const schemas = {
  addSchema,
  updateFavSchemas,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
