const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");

const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter name for contact"],
    },
    email: {
      type: String,
      required: [true, "missing required fields"],
    },
    phone: {
      type: String,
      required: [true, "missing required fields"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .required()
    .messages({ "any.required": "missing required fields" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required fields" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required fields" }),
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

contactSchema.post("save", HandleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
