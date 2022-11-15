const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const { handleSchemaValidationsErrors } = require("../middlewares");
// const handleSchemaValidationsErrors = require("../helpers/handleSchemaValidationErrors");
const { handleSchemaValidationsErrors } = require("../helpers");

const contactSchema = Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      match: /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationsErrors);

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
