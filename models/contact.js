const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const patterns = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      match: patterns.email,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const contactFull = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(patterns.email).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});

const contactFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactFull,
  contactFavorite,
};

module.exports = {
  Contact,
  schemas,
};
