const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactShema = Schema({
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

const ubdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  phone: Joi.string().length(14),
});

const updateFavorite = Joi.object({ favorite: Joi.bool().required() });

const schemas = {
  ubdateContact,
  updateFavorite,
};

const Contact = model("contact", contactShema);

module.exports = { schemas, Contact };
