const { handleMongooseError } = require("../helpers");
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexp = /^(?:(?:\+?|\()?[\d\s()-]*\d[\d\s()-]*){7,14}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required. Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Email is required. Set email for contact"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, "Phone is required. Set phone for contact"],
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

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "missing required email field",
    }),
  phone: Joi.string().min(10).max(15).required().pattern(phoneRegexp).messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean().messages({
    "any.required": "missing fields favorite",
  }),
});

const updateFavoretesSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing fields favorite",
  }),
});

const schemas = {
  addSchema,
  updateFavoretesSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};