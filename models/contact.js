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

const joiSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9.]{3,}@[a-zA-Z0-9]+[.]+[a-zA-Z0-9]+$/)
    .required(),
  phone: Joi.string()
    .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

//Model - работа с базой
const Contact = model("contact", contactSchema);

module.exports = {
  joiSchema,
  updateFavoriteJoiSchema,
  Contact,
};
