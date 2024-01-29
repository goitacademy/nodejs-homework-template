const { Schema, model } = require("mongoose");

const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const regexString = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/;
const regexPhone = /^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
const contactSchema = Schema(
  {
    name: {
      type: String,
      match: regexString,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: regexPhone,
      required: [true, "Set phone number"],
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
contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().pattern(regexString).required().messages({
    "string.pattern.base": "Enter name and surname",
    "any.required": "Missing name field",
  }),
  email: Joi.string().required(),
  phone: Joi.string().pattern(regexPhone).required().messages({
    "string.pattern.base": "Enter phone number in format: 000-000-00-00",
    "any.required": "Missing phone field",
  }),
  favorite: Joi.boolean(),
});
const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const schema = {
  addSchema,
  favoriteSchema,
};
module.exports = { Contact, schema };
