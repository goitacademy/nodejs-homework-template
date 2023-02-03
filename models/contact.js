const Joi = require("joi");
const { Schema, model } = require("mongoose");

const contactSchema = Schema(
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
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
// Joi дублює перевірку, він не обов'язковий
const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const schemas = { addShema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);
// const Contact = model( "contact" - така ж назва як і в створенної колекціі в базі данних, тільки в однині, мангус зрозуміє  , contactSchema);

module.exports = { Contact, schemas, updateFavoriteSchema };
