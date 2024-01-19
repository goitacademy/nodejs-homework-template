const Joi = require("joi");
const { Schema, model } = require("mongoose");

const patterns = {
  name: /^[a-zA-Z0-9_\- ]{3,20}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\(\d{3}\) \d{3}-\d{4}$/,
};

const contactSchema = Joi.object({
  name: Joi.string().max(30).pattern(patterns.name).required(),
  email: Joi.string().email().pattern(patterns.email).required(),
  phone: Joi.string().pattern(patterns.phone).required(),
  favorite: Joi.boolean().default(false),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const modelContactSchema = new Schema(
  {
    name: {
      type: String,
      match: patterns.name,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: patterns.email,
    },
    phone: {
      type: String,
      match: patterns.phone,
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
const Contact = model("Contact", modelContactSchema);

module.exports = { contactSchema, favoriteSchema, Contact };
