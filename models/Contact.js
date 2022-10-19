const { Schema, model } = require("mongoose");
const { hendleSave } = require("../helpers");
const Joi = require("joi");

const contactSchma = new Schema(
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
  { versionKey: false, timestamps: true }
);
const addSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
contactSchma.post("save", hendleSave);
const Contact = model("contact", contactSchma);

module.exports = { Contact, schemas };
