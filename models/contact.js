const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const numberPattern = /^[0-9]{10}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: numberPattern,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(numberPattern).required(),
  favorite: Joi.boolean(),
});

const updateByFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateByFavoriteSchema,
};

contactSchema.post("save", handleMongooseError);

const Contact = model("Contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
