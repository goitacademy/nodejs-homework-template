const Joi = require("joi");
const { Schema, model } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
}).options({
  messages: { "any.required": "missing required {{#label}} field" },
});

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

contactSchema.post("save", HttpError);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactAddSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { schemas, Contact };
