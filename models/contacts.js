const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactJoiSchema = Joi.object({
  name: Joi.string().min(1).max(25).required(),
  email: Joi.string().min(1).max(15).required(),
  phone: Joi.number().required(),
  favorite: Joi.bool(),
});
const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});
const Contact = model("contact", contactSchema);

module.exports = { Contact, contactJoiSchema, favoriteJoiSchema };
