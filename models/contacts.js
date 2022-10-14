const { Schema, model } = require("mongoose");
const joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const emailValide = /(.+)@(.+){2,}\.(.+){2,}/;

const contactSchema = new Schema({
  name: {
    type: String,
    // unique: true,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: emailValide,
    unique: true,
    required: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post("save", handleSaveErrors);

const addContactShema = joi.object({
  name: joi.string().required(),
  email: joi.string().pattern(emailValide).required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

const schemas = {
  addContactShema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");
// const contactsPath = path.join(__dirname, "./contacts.json");

// const updateContacts = async (contacts) =>
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const result = contacts.find((contact) => contact.id === contactId);
//   return result;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await updateContacts(contacts);
//   return result;
// };

// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...body,
//   };
//   contacts.push(newContact);
//   await updateContacts(contacts);
//   return newContact;
// };

// const updateContactsById = async (id, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, ...body };
//   await updateContacts(contacts);
//   return contacts[index];
// };

// (module.exports = {
// listContacts,
// getContactById,
// removeContact,
// addContact,
// updateContactsById,
// })
// );
