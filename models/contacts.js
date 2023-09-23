const { model, Schema } = require("mongoose");
const { handleMongooseEroor } = require("../helpers");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactSchema.post("save", handleMongooseEroor);

const addSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "any.required": `missing required name field`,
    "string.empty": `"name" cannot be empty, min 2 max 30 letters`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "uk", "ca", "org"] },
    })
    .required()
    .messages({
      "any.required": `missing required email field`,
      "string.empty": `"email" cannot be empty`,
    }),
  phone: Joi.string().min(5).max(15).required().messages({
    "any.required": `missing required phone field`,
    "string.empty": `"phone" cannot be empty, min 5 max 15 numbers.`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing required favorite field`,
    "string.empty": `"favorite" cannot be empty`,
  }),
});

const Contact = model("contact", contactSchema);

const schemas = { addSchema, updateFavoriteSchema };

module.exports = { Contact, schemas };
