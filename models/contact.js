const Joi = require("joi");
const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().min(2).alphanum().required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.number().integer().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = { schemas, Contact };
