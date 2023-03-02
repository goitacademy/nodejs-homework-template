const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      message: "Set name for contact",
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(v);
        },
        message: "{VALUE} is not a valid phone number!",
      },
      min: 9,
      max: 14,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);

const joiSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z]+\s?[a-zA-Z]+$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().min(9).max(14).required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);
module.exports = { Contact, joiSchema, updateFavoriteSchema };
