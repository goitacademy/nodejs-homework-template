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
    },
  },
  { versionKey: false, timestamps: true }
);

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  contactAddSchema,
  contactUpdateSchema,
};
