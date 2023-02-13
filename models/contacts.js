const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchemaModel = Schema(
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
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchemaModel);

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().integer().required(),
  favorite: Joi.bool(),
});

const favoriteContactSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  Contact,
  contactSchema,
  favoriteContactSchema,
};
