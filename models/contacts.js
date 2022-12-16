// const fs = require('fs/promises')
const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "./contacts.json");
// const contactsPath = path.resolve("./models/contacts.json");
// console.log("contactsPath", contactsPath);

const listContacts = async () => {
  const listContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(listContacts);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contactById = contactsList.find((contact) => contact.id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactsList.splice(index, 1);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsList, null, 2),
    "utf-8"
  );
  return result;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const id = shortid.generate();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const contactsList = await listContacts();
  // const newListContacts = [...contactsList, newContact];
  contactsList.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsList, null, 2),
    "utf-8"
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const updatedContact = {
    id: contactId,
    name,
    email,
    phone,
  };

  // const newListContacts = [...contactsList, newContact];

  contactsList[index] = updatedContact;
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsList, null, 2),
    "utf-8"
  );
  return updatedContact;
};

const optionaUpdatelContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  let contact = contactsList[index];
  if (name) {
    contact = { ...contact, name };
  }
  if (email) {
    contact = { ...contact, email };
  }
  if (phone) {
    contact = { ...contact, phone };
  }

  contactsList[index] = contact;
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsList, null, 2),
    "utf-8"
  );
  return contact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  optionaUpdatelContact,
};
