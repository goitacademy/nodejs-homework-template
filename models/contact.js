const { Schema, model } = require("mongoose");
const Joi = require("joi");
const {handleMongooseError} = require("../helpers");
const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
const mailPattern = /^.+@.+\..+$/;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [mailPattern, "Please enter valid email"],
    },
    phone: {
      type: String,
      required: true,
      match: [phonePattern, "Please enter a valid phone number."],
    },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);



const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(mailPattern),
  phone: Joi.string().required().pattern(phonePattern),
  favorite: Joi.boolean(),
});

const favoriteValidationSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema, favoriteValidationSchema };
