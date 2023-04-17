const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils/index");

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
  {
    versionKey: false,
  }
);

contactSchema.post("save", handleMongooseError);

const schemas = {
  // Create a new contact schema
  addSchema: Joi.object().keys({
    name: Joi.string().required().messages({
      "any.required": `missing required name field`,
      "string.empty": `name field cannot be empty`,
    }),
    email: Joi.string().required().messages({
      "any.required": `missing required email field`,
      "string.empty": `email field cannot be empty`,
    }),
    phone: Joi.string().required().messages({
      "any.required": `missing required phone field`,
      "string.empty": `phone field cannot be empty`,
    }),
    favorite: Joi.boolean(),
  }),
  // Update contact schema
  updateSchema: Joi.object()
    .keys({
      name: Joi.string().min(1),
      email: Joi.string().email(),
      phone: Joi.string().min(1),
      favorite: Joi.boolean(),
    })
    .min(1)
    .messages({
      "object.min": "missing fields",
    }),
  // Update contact status (favorite)
  updateContactStatus: Joi.object({
    favorite: Joi.boolean().required().messages({
      "any.required": "missing field favorite",
    }),
  }),
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
