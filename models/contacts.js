const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');


// Отримати всі контакти
const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

// Отримати контакт за id
const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find(contact => contact.id === id);
  return contactById || null;
}

 // Видалити контакт за id
const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null
  };
  const [deletedContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
}

// Додати контакт
const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(), ...body,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

// Оновити контакт за id
const updateContact = async (id, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

// ========================================
// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   const contactList = await fs.readFile(contactsPath);
//   return JSON.parse(contactList);
// };

// const getContactById = async (contactId) => {
//   const contactList = await listContacts();
//   const contact = contactList.find((contact) => contact.id === contactId);
//   return contact || null;
// };

// const addContact = async (body) => {
//   const contactList = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...body,
//   };
//   contactList.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
//   return newContact;
// };

// const updateContact = async (id, body) => {
//   const contactList = await listContacts();
//   const contactIndex = contactList.findIndex((contact) => contact.id === id);
//   if (contactIndex === -1) {
//     return null;
//   }
//   contactList[contactIndex] = { id, ...body };
//   await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
//   return contactList[contactIndex];
// };

// const removeContact = async (contactId) => {
//   const contactList = await listContacts();
//   const contactIndex = contactList.findIndex(
//     (contact) => contact.id === contactId
//   );
//   if (contactIndex === -1) {
//     return null;
//   }
//   const [deletedContact] = contactList.splice(contactIndex, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
//   return deletedContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   addContact,
//   updateContact,
//   removeContact,
// };
// +++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++

// const fs = require('fs/promises');
// const path = require('path');
// const { nanoid } = require('nanoid');

// // Абсолютний шлях
// const contactsPath = path.join(__dirname, 'contacts.json');

// // Ф-ція оновлення .json
// const updateList = async (allContacts) =>
//   await fs.writeFile(
//     contactsPath,
//     JSON.stringify(allContacts, null, 2)
//   );

// // Отримати всі контакти
// const getAllContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// // Отримати контакт за id
// const getContactById = async (id) => {
//   const allContacts = await getAllContacts();
//   const res = allContacts.find(
//     (contact) => contact.id === id
//   );
//   return res || null;
// };

// // Додати контакт
// const addContact = async ({ name, email, phone }) => {
//   const allContacts = await getAllContacts();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };

//   allContacts.push(newContact);
//   await updateList(allContacts);
//   return newContact;
// };

// // Оновити контакт за id
// const updateContactById = async (id, data) => {
//   const allContacts = await getAllContacts();
//   const index = allContacts.findIndex(
//     (contact) => contact.id === id
//   );
//   if (index === -1) {
//     return null;
//   }

//   allContacts[index] = { id, ...data };
//   await updateList(allContacts);
//   return allContacts[index];
// };

// // Видалити контакт за id
// const deleteContactById = async (id) => {
//   const allContacts = await getAllContacts();
//   const index = allContacts.findIndex(
//     (contact) => contact.id === id
//   );
//   if (index === -1) {
//     return null;
//   };
//   const [deletedContact] = allContacts.splice(index, 1);  
//   await updateList(allContacts);

//   return deletedContact;
// };

// module.exports = {
//   getAllContacts,
//   getContactById,
//   addContact,
//   updateContactById,
//   deleteContactById,
// };