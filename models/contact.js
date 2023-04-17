const { Schema, model } = require("mongoose");

const handlerMogoosError = require("../helpers/handlerMogoosError");

const contactSchema = new Schema(
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
  },
  { versionKey: false }
);

contactSchema.post("save", handlerMogoosError);

const Contact = model("contact", contactSchema);

/**
  Joi Schema----------------------------------------------------------------------
*/

const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  phone: Joi.string().required(),
});

const editContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  phone: Joi.string(),
});

const editFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = {
  addContactSchema,
  editContactSchema,
  editFavoriteSchema,
  Contact,
};
