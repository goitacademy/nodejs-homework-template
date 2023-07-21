const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const phoneRegexp = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Field email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Field phone is required"],
      unique: true,
      match: [
        phoneRegexp,
        "The phone number should be in the format xxx-xxx-xxxx or (xxx) xxx-xxxx.",
      ],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { addSchema, updateFavoriteSchema };

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
