const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const contact = contactList.find((el) => el.id === contactId);
  return contact ? contact : null;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  let contact = null;
  let index = null;
  contactList.find((el, ind) => {
    if (el.id === contactId) {
      contact = el;
      index = ind;
    }
  });

  if (contact) {
    contactList.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
    return contact;
  } else {
    return contact;
  }
};

const addContact = async (body) => {
  const contactList = await listContacts();
  const newContact = { id: uuidv4(), ...body };
  contactList.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactList = await listContacts();
  const index = contactList.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const updatedContact = { ...contactList[index], ...body };
  const updatedContactList = contactList.map((item) =>
    item.id === contactId ? updatedContact : item
  );
  fs.writeFile(contactsPath, JSON.stringify(updatedContactList, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};