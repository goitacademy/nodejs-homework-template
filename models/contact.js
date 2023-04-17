const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handelMongooseError } = require("../helpers");
const favoriteOptions = [true, false];

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().valid(...favoriteOptions).required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .valid(...favoriteOptions)
    .required(),
});

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

contactSchema.post("save", handelMongooseError);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  contactsSchema,
    updateSchema,
updateFavoriteSchema,
};
