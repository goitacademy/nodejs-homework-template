const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactList = [
  "Allen Raymond",
  "nulla.ante@vestibul.co.uk",
  "(992) 914-3792",
];

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

contactSchema.post("save", function (error, doc, next) {
  if (error) {
    return handleMongooseError(error, doc, next);
  }
  next();
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .valid(...contactList)
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

const Contact = model("contacts", contactSchema);

module.exports = {
  Contact,
  schemas,
};
