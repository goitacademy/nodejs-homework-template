const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 1,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      minlength: 1,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const joiContactSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, "name")
    .required(),
  email: Joi.string().email(),
  phone: Joi.string().min(1),
  favorite: Joi.bool(),
});

const joiContactStatusSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiContactSchema, joiContactStatusSchema };
