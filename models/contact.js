const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

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
contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});

const putSchema = Joi.object({
  name: Joi.string().messages({
    "any.required": "name is not valid",
  }),
  email: Joi.string().messages({
    "any.required": "email is not valid",
  }),
  phone: Joi.string().messages({
    "any.required": "phone is not valid",
  }),
  favorite: Joi.boolean(),
});

const patchSchema = Joi.object({ favorite: Joi.boolean().required });

const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema, patchSchema, putSchema };
