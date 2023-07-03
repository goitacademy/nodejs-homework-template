const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
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
      required: [true, "Set phone for contact"],
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
  {
    versionKey: false,
    timestamps: true,
  }
);
contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required().messages({
    "string.base": "Name should be a string",
    "string.min": "Name should have a minimum length of {#limit}",
    "any.required": "Missing required name field",
  }),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "any.required": "Missing required email field",
    }),

  phone: Joi.string().required().messages({
    "any.required": "Missing required phone field",
  }),
  favorite: Joi.boolean().messages({
    "any.required": `missing field favorite`,
  }),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const Contact = model("contact", contactSchema);

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };
