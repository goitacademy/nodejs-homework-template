const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

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
  name: Joi.string().label("name field").min(3).max(25).required(),
  email: Joi.string()
    .label("email field")
    .email({ minDomainSegments: 2 })
    .required(),
  phone: Joi.string()
    .label("phone field")
    .min(3)
    .trim()
    .max(15)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.pattern.base": `Phone number can contain from 3 to 15 digits.`,
    })
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
