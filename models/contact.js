const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseErr } = require("../helpers");
const contactsSchema = new Schema(
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
  { versionKey: false, timestamps: true }
);
contactsSchema.post("save", handleMongooseErr);

const newContactsSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  favorite: Joi.boolean(),
});
const existingContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contacts = model("contact", contactsSchema);
const joiSchemas = {
  newContactsSchema,
  existingContactSchema,
  updateFavoriteSchema,
};
module.exports = { Contacts, joiSchemas };
