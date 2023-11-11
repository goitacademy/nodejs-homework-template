// const fs = require("fs/promises");
// const path = require("path");
// const uniqid = require("uniqid");

// const contactsPath = path.join(__dirname, "./contacts.json");

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const contactSchema = Schema({
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

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schamas = {
  addSchema,
  updateFavoriteSchema,
};

const Contacts = model("contacts", contactSchema);

model.exports = {
  Contacts,
  schamas,
};

// const getContactById = async (contactId) => {
//   const allContacts = await listContacts();
//   const searchContact = allContacts.find((contact) => contact.id === contactId);

//   if (!searchContact) {
//     return null;
//   }
//   return searchContact;
// };

// const removeContact = async (contactId) => {
//   const allContact = await listContacts();
//   const searchContactById = allContact.find(
//     (contact) => contact.id === contactId
//   );
//   const indexContactForDelate = allContact.indexOf(searchContactById);
//   if (indexContactForDelate === -1) {
//     return null;
//   }

//   const [spliceArr] = allContact.splice(indexContactForDelate, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(allContact));
//   return spliceArr;
// };

// const addContact = async (body) => {
//   const { name, email, phone } = body;
//   const allContacts = await listContacts();
//   const newContact = { id: uniqid(), name, email, phone };
//   allContacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(allContacts));
//   return allContacts;
// };

// const updateContact = async (contactId, body) => {
//   const { name, email, phone } = body;
//   const allContacts = listContacts();
//   const index = allContacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   allContacts[index] = { contactId, name, email, phone };
//   await fs.writeFile(contactsPath, JSON.stringify(allContacts));
//   return allContacts[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
