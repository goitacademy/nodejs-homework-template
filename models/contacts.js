const { Schema, model } = require("mongoose");
const codeRegexp = /^[0-9]{9}$/;
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
    ref: "user",
  },
});

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.number().required(),
  favorite: Joi.bool(),
  code: Joi.string().pattern(codeRegexp),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  add: addSchema,
  updateFavorite: updateFavoriteSchema,
};
const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
