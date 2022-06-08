const { Schema, model } = require("mongoose");

const Joi = require("joi");

const codeRegexp = {
  name: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
  phone: /\(\d{3,3}\)[\s]\d{3,3}[-]\d{4,4}/,
};

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
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const contactAdd = Joi.object({
  name: Joi.string().pattern(codeRegexp.name).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(codeRegexp.phone).required(),
  favorite: Joi.bool(),
});

const contactUpd = Joi.object({
  name: Joi.string().pattern(codeRegexp.name),
  email: Joi.string().email(),
  phone: Joi.string().pattern(codeRegexp.phone),
  favorite: Joi.bool(),
});

const joiSchema = { contactAdd, contactUpd };

module.exports = { Contact, joiSchema };
