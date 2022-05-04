const { Schema, model } = require("mongoose");
const Joi = require("joi");

const codeRegexp = /[0-9]+/;

const contactSchema = Schema({
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
});

const joiSchema = Joi.object({
  name: Joi.string().required().max(30),
  email: Joi.string().required().max(30),
  phone: Joi.string().pattern(codeRegexp).required(),
  favorite: Joi.boolean(),
});
const statusJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  statusJoiSchema,
};
