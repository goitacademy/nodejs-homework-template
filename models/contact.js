const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"]
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    favorite: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const contactAddtSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool()
});

const contactFavoriteUpdateSchema = Joi.object({
  favorite: Joi.bool()
    .required()
    .messages({ "any.required": `missing field favorite` })
});

module.exports = {
  Contact,
  add: contactAddtSchema,
  updateFavorite: contactFavoriteUpdateSchema
};
