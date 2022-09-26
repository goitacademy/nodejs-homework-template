const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleValidationErrors } = require("../../middlewares");

const nameRegexp = /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/;
const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
const emailRegexp = /^.+@.+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 3,
      match: nameRegexp,
      trim: true,
      unique: true,
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
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().min(3).pattern(nameRegexp).trim().required(),
  email: Joi.string().email().trim().pattern(emailRegexp).required(),
  phone: Joi.string().min(10).pattern(phoneRegexp, "numbers").trim().required(),
  favorite: Joi.bool(),
});

const upadateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  addSchema,
  upadateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  schemas,
  Contact,
};
