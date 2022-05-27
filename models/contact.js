const { Schema, model } = require("mongoose");
const Joi = require("joi");

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
    ref: 'user',
  }
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ca", "uk", "org"] },
    }),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  add: addSchema,
  update: updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
