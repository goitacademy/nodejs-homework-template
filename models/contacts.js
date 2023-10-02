const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phonePattern = /^[0-9\s\-()]+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailPattern,
      required: true,
    },
    phone: {
      type: String,
      minlength: 8,
      match: phonePattern,
      required: true,
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
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(6).required().pattern(emailPattern),
  phone: Joi.string().min(8).required().pattern(phonePattern),
  favorite: Joi.boolean(),
}).messages({
  "any.required": "missing required {{#label}} field",
  "string.pattern.base": "{#label} in not valid",
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `{#label} is a required field`,
  }),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  addSchema,
  favoriteSchema,
};
