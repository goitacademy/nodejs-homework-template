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
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: [
        /^\(\d{3}\) \d{3}-\d{4}$/,
        "Invalid phone number format. Expected format is (000) 000-0000. Please fill a valid phone number",
      ],
      required: [true, "Set phone for contact"],
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
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than or equal to 30 characters long",
    "string.empty": 'The "name" field must not be empty',
    "any.required": "Missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": 'The "email" field must not be empty',
    "any.required": "Missing required email field",
  }),
  phone: Joi.string().required().messages({
    "string.empty": 'The "phone" field must not be empty',
    "any.required": "Missing required phone field",
  }),
});

const setFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing required favorite field",
  }),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema, setFavoriteSchema };
