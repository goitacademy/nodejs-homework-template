// const { json } = require("express");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
// const { brotliDecompress } = require("zlib");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath, "utf-8");

  return allContacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const parseAllContacts = JSON.parse(allContacts);
  const contactById = parseAllContacts.find(
    (contact) => contact.id === contactId
  );
  // if (!contactById) {
  //   return JSON.stringify({ message: "Not found" });
  // }
  return contactById || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const parseAllContacts = JSON.parse(allContacts);

  const removedContact = parseAllContacts.find((contact) => {
    return contact.id === contactId;
  });

  if (!removedContact) {
    // JSON.stringify({ message: "Not found" });
    return null;
  }

  const index = parseAllContacts.indexOf(removedContact);
  parseAllContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(parseAllContacts, null, 2));

  return { message: "contact deleted" };
};

const addContact = async (body) => {
  const newContact = { ...body, id: nanoid() };

  const allContacts = await listContacts();
  const parseAllContacts = JSON.parse(allContacts);
  const updateList = [...parseAllContacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(updateList, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const parseAllContacts = JSON.parse(allContacts);
  const contactById = parseAllContacts.find(
    (contact) => contact.id === contactId
  );
  if (!contactById) {
    return null;
  }
  const updateContact = { ...contactById, ...body };
  const updateList = parseAllContacts.map((contact) => {
    return contact.id === contactId ? updateContact : contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(updateList, null, 2));
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
// const fs = require("fs/promises");
// const path = require("path");
// // const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");

// console.log(__dirname);

// const listContacts = async (data) => {
//   const allContacts = await fs.readFile(contactsPath);
//   return JSON.parse(allContacts);
// };

// async function getContactById(contactId) {
//   const allContacts = await listContacts();
//   const contactById = allContacts.find((contact) => contact.id === contactId);
//   if (!contactById) {
//     return null;
//   }
//   return contactById || null;
// }

// async function removeContact(contactId) {
//   const allContacts = await listContacts();
//   const contactById = allContacts.find((contact) => contact.id === contactId);
//   const index = allContacts.indexOf(contactById);

//   if (index === -1) {
//     return null;
//   }

//   const removedCntact = allContacts.splice(index, 1);

//   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
//   return removedCntact || null;
// }

// async function addContact({ name, email, phone }) {
//   const allContacts = await listContacts();
//   const addContact = allContacts.push({ name, email, phone, id: nanoid() });
//   console.log(allContacts);

//   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
//   return addContact;
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
