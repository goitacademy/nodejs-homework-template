const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minLength: 2,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      trim: true,
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
  name: Joi.string().min(2).trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().min(3).required(),
  favorite: Joi.bool(),
  owner: Joi.string(),
});

const joiSchemaFavorite = Joi.object({
  favorite: Joi.bool(),
});

const schemas = {
  joiSchemaAll,
  joiSchemaFavorite,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
