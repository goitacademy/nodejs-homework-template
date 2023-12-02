const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const addAndUpdateSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .messages({
      "any.required": "missing required name field",
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "any.required": "missing required email field",
    })
    .required(),
  phone: Joi.string()
    .min(5)
    .max(15)
    .messages({
      "any.required": "missing required phone field",
    })
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addAndUpdateSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
