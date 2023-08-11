const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");
const Joi = require("joi");

const contactsSchema = new Schema({
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
});

contactsSchema.post("save", handleMongooseError);

const Contact = model("contact", contactsSchema);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };

// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "/contacts.json");

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// const getById = async (contactId) => {
//   const contacts = await listContacts();
//   const contact = contacts.find((contact) => contact.id === contactId);
//   return contact || null;
// };

// const addContact = async (body) => {
//   const newContact = { id: nanoid(), ...body };
//   const contacts = await listContacts();
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// };

// const updateContact = async (contactId, body) => {
//   console.log("updateContact in models", contactId, body);
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id: contactId, ...body };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// };

// module.exports = {
//   listContacts,
//   getById,
//   removeContact,
//   addContact,
//   updateContact,
// };
