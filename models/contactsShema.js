const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactSchema = new Schema({
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
});
const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(3).max(30).required(),
});

const schemas = {
  add: addSchema,
};

const Contact = model("contact", contactSchema);
module.exports = {
  Contact,
  schemas,
};
