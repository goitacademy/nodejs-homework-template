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
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Contact = model("contacts", contactSchema);

const validateAddContactSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .pattern(/^[0-9+() -]*$/)
    .required(),
  favorite: Joi.bool()
});

const validateUpdateContactSchema = Joi.object({
  name: Joi.string().min(1).max(30),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().pattern(/^[0-9+()-]*$/),
  favorite: Joi.bool()
});

module.exports = {
  Contact,
  validateAddContactSchema,
  validateUpdateContactSchema,
};
