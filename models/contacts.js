const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegexp =
  /^\+?(\d{1,4})?\s?(\d{3,4})?\s?(\d{2,4})\s?(\d{2})\s?(\d{2})$/;

const contactShema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: [emailRegexp, "Enter correct email"],
    required: true,
  },
  phone: {
    type: String,
    match: [
      phoneRegexp,
      'Enter number in format "+3809322..." or "3809322..."',
    ],
    required: true,
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

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(16).required(),
});
const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const userSchemas = {
  addSchema,
  favoriteSchema,
};

const Contact = model("contact", contactShema);
module.exports = {
  Contact,
  userSchemas,
};
