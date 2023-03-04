// const fs = require("fs/promises");
// const path = require("path");

// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "../models/contacts.json");

// const listContacts = async () => {
//   const result = await fs.readFile(contactsPath, "utf-8");
//   return JSON.parse(result);
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const result = contacts.find((item) => item.id === contactId);
//   return result || null;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }

//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
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

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }

//   const updatedContact = { ...contacts[index], ...body };
//   contacts.splice(index, 1, updatedContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return updatedContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Slava:O2OZZX4wBjQy2n2S@cluster0.pmj6ulj.mongodb.net/db_contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect success"))
  .catch((error) => console.log(error.message));
