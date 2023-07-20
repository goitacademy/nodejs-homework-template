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
}, {versionKey: false});

const Contact = model("contact", contactSchema);

const postPutSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(14).max(14).required(),
  });
  
  const patchSchema = Joi.object({
    favorite: Joi.boolean().required()
  });

  const joiSchemas = {
    postPutSchema,
    patchSchema
  }

module.exports = {
    Contact,
    joiSchemas
};
