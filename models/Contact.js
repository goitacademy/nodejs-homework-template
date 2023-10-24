const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveError, preUpdate } = require("../models/hooks");

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
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleSaveError); // для того, щоб викидати помилку з правильним статусом

contactSchema.pre("findOneAndUpdate", preUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

const addSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    "any.required": `"name" must be exist`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "any.required": `"email" must be exist`,
      "string.base": `"email" must be string`,
    })
    .email(),
  phone: Joi.string().required().messages({
    "any.required": `"email" must be exist`,
    "string.base": `"email" must be string`,
  }),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50),
  email: Joi.string().min(3).max(50).email(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema, updateSchema, updateFavoriteSchema };
