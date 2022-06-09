const Joi = require("joi");
const { Schema, model } = require("mongoose");

const contatSchema = Schema({
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
    required: [true, "Owner is required"],
  },
});

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});
const joiBoolSchema = Joi.object({
  favorite: Joi.bool().required(),
});
const Contact = model("contact", contatSchema);
module.exports = { Contact, joiSchema, joiBoolSchema };
