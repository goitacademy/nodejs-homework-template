// const fs = require('fs/promises')

const listContacts = async () => {};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
const { Schema, model } = require("mongoose");

const { handelMongooseError } = require("../utils");

const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "'Set name for contact'!"] },
    email: { type: String, required: [true, "'Set email for contact'!"] },
    phone: { type: String, required: [true, "'Set phone for contact'!"] },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: false }
);

contactSchema.post("save", handelMongooseError);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  schemas,
  Contact,
};
