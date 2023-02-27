const { Schema, model } = require("mongoose");
const joi = require("joi");
// const { handleSaveErrors } = require("../helpers");

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// contactSchema.post("save", handleSaveErrors);

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string(),
  phone: joi.string(),
  favorite: joi.boolean(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };

// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "./contacts.json");

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath, "utf-8");
//   return JSON.parse(data);
// };

// const getContactById = async (id) => {
//   const contacts = await listContacts();
//   const result = contacts.find((contact) => contact.id === id);
//   return result || null;
// };

// const removeContact = async (id) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [delecontact] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return delecontact;
// };

// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...body,
//   };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const updateContact = async (id, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, ...body };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// };

// module.exports = {
// listContacts,
// getContactById,
// removeContact,
// addContact,
// updateContact,
// };
