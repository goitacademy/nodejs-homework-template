const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 3,
    },
    email: {
      type: String,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      match: /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/,
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
  {
    versionKey: false,
    timestamps: true,
  }
);
const joiContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  phone: Joi.string()
    .pattern(/^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/)
    .required(),
  favorite: Joi.binary(),
});
const Contact = model("contact", contactSchema);
module.exports = {
  Contact,
  joiContactSchema,
};
