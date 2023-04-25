// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");

// // get and return list of all contacts from database
// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// // find and return defined contact (by ID of this contact)
// const getById = async (contactId) => {
//   const contacts = await listContacts();
//   const res = contacts.find((item) => item.id === contactId.toString());
//   return res || null;
// };

// // add new contact in database and return it after adding
// const addContact = async (data) => {
//   const { name, email, phone } = data;
//   const contacts = await listContacts();
//   const newContact = { id: nanoid(), name, email, phone };

//   contacts.push(newContact);

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// // delete contact (by ID of this contact) and return it
// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex((item) => item.id === contactId.toString());

//   if (idx === -1) return null;
//   const [res] = contacts.splice(idx, 1);

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return res;
// };

// // update some features in contact (by ID of this contact) and return it
// const updateContact = async (contactId, data) => {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex((item) => item.id === contactId.toString());

//   if (idx === -1) return null;
//   contacts[idx] = { id: contactId, ...data };

//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[idx];
// };

// module.exports = {
//   listContacts,
//   getById,
//   removeContact,
//   addContact,
//   updateContact,
// };

