
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexp = /^[\(]\d{3}[\)]\s\d{3}[\-]\d{4}$/;

const contactSchema = new Schema({
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
    match: phoneRegexp,
    required: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const addSchema = Joi.object({
  name: Joi.string()
    .messages({
      "any.required": "missing required name field",
    })
    .required(),
  email: Joi.string()
    .messages({
      "any.required": "missing required email field",
    })
    .required(),
  phone: Joi.string()
    .pattern(phoneRegexp)
    .messages({
      "any.required": "missing required phone field",
    })
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .messages({
      "any.required": "missing field favorite",
    })
    .required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
=======
const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (allContacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const findContact = allContacts.find((item) => item.id === contactId);
  if (!findContact) return null;
  return findContact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [deleteContact] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return deleteContact;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: shortid.generate(),
    ...body,
  };
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  allContacts[index] = { contactId, ...body };
  await updateContacts(allContacts);
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

