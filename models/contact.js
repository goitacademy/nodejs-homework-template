const { Schema, model } = require("mongoose");
const Joi = require("joi");

// const { handleSchemaValidationsErrors } = require("../middlewares");

const contactSchema = Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: {
      type: String,
    },
    phone: {
      type: String,
      // match:/^/
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// contactSchema.post("save", handleSchemaValidationsErrors);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().trim().email().required(),

  phone: Joi.string()
    .regex(/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/)
    .required(),
  favorite: Joi.bool().valid(true, false),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().valid(true, false).required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, favoriteJoiSchema };
