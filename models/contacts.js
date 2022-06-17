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
      required: [true, "Set email for contact"],
      unique: true,
      //   match:
      //     /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
    },
    phone: {
      type: Number,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaAll = Joi.object({
  name: Joi.string().alphanum().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.number().required(),
  favorite: Joi.bool(),
  owner: Joi.string().trim(),
});

const joiSchemaFavorite = Joi.object({
  favorite: Joi.bool(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchemaAll,
  joiSchemaFavorite,
};
