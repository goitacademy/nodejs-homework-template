const Joi = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contacts = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: { type: String },
  phone: { type: String },
  favorite: { type: Boolean, default: false },
});

const User = mongoose.model("contacts", contacts);

const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "pl", "uk"] },
    }),
  phone: Joi.string().required().min(9),
  favorite: Joi.boolean().required(),
});

const favoriteValidationSchema = Joi.object({
  favorite: Joi.boolean().required().default(false),
});

module.exports = { User, userValidationSchema, favoriteValidationSchema };
