const { Schema, model } = require("mongoose");
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const Contact = model("contact", contactSchema);

const requiredContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required 'name' - field",
  }),

  email: Joi.string().email().required().messages({
    "any.required": "Missing required 'email' - field",
  }),

  phone: Joi.string().required().messages({
    "any.required": "Missing required 'phone' - field",
  }),
});

module.exports = { Contact, requiredContactSchema };
