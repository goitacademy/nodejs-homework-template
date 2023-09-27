const { Schema, model } = require("mongoose");
const Joi = require("joi");
const subscriptionList = require("../constants/subscription");

const phoneRegex = /^[0-9+() -]*$/;
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
      required: [true, "Set phone for contact"],
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Contact = model("contacts", contactSchema);

const validateAddContactSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.bool(),
});

const validateUpdateContactSchema = Joi.object({
  name: Joi.string().min(1).max(30),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().pattern(phoneRegex),
  favorite: Joi.bool(),
});

const validateUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

module.exports = {
  Contact,
  validateAddContactSchema,
  validateUpdateContactSchema,
  validateUpdateSubscription,
};
