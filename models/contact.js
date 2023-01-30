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
      minlength: 3,
      maxlength: 13,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },

  { versionKey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const favoreiteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiContactSchema,
  favoreiteJoiSchema,
};
