const { Schema, model } = require("mongoose");

const Joi = require("joi");

const nameRegexp = /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/;
const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
const emailRegexp = /^.+@.+$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 3,
      match: nameRegexp,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      match: emailRegexp,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      trim: true,
      match: phoneRegexp,
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

const Contact = model("contact", contactSchema);

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).pattern(nameRegexp).trim().required(),

  email: Joi.string().email().trim().pattern(emailRegexp).required(),

  phone: Joi.string().min(10).pattern(phoneRegexp, "numbers").trim().required(),

  favorite: Joi.boolean(),
});

const favoriteJoiContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Contact,
  joiContactSchema,
  favoriteJoiContactSchema,
};
