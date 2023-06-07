const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org"] },
    })
    .required(),
  phone: Joi.string().min(6).required(),
  favorite: Joi.boolean(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org"] },
  }),
  phone: Joi.string().min(6),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .messages({
      "string.pattern.base": "please enter a valid favorite",
      "any.required": "missing field favorite",
    })
    .required(),
});

const schemas = {
  schemaAddContact,
  schemaUpdateContact,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  schemas,
  Contact,
};
