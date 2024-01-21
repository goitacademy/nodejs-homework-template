const { Schema, model } = require("mongoose");

const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const regexString = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/;
const regexPhone = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
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
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().pattern(regexString).required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(regexPhone).required(),
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
