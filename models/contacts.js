const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addContactsSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().min(4).max(100).required().email(),
  phone: Joi.string()
    .min(4)
    .max(20)
    .required()
    .pattern(/^(\+3|)[0-9]{10,11}$/),
  favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  "any.required": "missing field favorite",
});

const contactSchemas = { addContactsSchema, updateFavoriteSchema };
const Contact = model("contact", contactSchema);

module.exports = { Contact, contactSchemas };