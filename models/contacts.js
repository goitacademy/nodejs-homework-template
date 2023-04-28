const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { mongooseHandleError } = require("../helpers");

const phoneRedex = /^[0-9]{10}$/;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    match: phoneRedex,
    required: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }
});

contactSchema.post("save", mongooseHandleError);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(phoneRedex)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};