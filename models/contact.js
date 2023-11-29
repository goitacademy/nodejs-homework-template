const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const Joi = require("joi");
// validate body
const addSchema = Joi.object({
  name: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .min(6)
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

// validate data when save in db
const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// Throwing a 400 error on an invalid field
contactsSchema.post("save", handleMongooseError);

const Contact = model("contact", contactsSchema);

module.exports = { Contact, schemas };
