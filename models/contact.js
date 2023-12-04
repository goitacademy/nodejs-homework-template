const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../middlewares");

const contactSchema = new Schema(
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
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const bodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean().default(false).messages({
    "any.required": "missing required favorite field",
  }),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().messages({
    "any.required": "missing required favorite field",
  }),
});

const Contact = model("contact", contactSchema);

const Schemas = {
  bodySchema,
  favoriteSchema,
};

module.exports = { Schemas, Contact };
