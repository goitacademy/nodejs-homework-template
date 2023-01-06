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
      required: [true, "Set e-mail for contact"],
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

contactSchema.post("save", handleMongooseError);

const schemaJoi = Joi.object({
  name: Joi.string().min(1).max(25).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .min(3)
    .trim()
    .max(15)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.pattern.base": `Phone number can contain from 3 to 15 digits.`,
    })
    .required(),
  favorite: Joi.bool(),
});

const updatefavoriteSchema = Joi.object({
  favorite: Joi.bool(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemaJoi, updatefavoriteSchema };
