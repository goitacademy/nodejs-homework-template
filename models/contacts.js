const fs = require("fs").promises;
const path = require("node:path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("models", "contacts.json");

const errorCatcher = (fn) => {
  try {
    return fn;
  } catch (error) {
    console.log("======error=====");
    console.log(error);
  }
};

const contactList = async () => {
  const result = await errorCatcher(await fs.readFile(contactsPath));
  const contacts = JSON.parse(result.toString());

  return contacts;
};

// REST API

const listContacts = async () => {
  return contactList();
};

const getContactById = async (contactId) => {
  const contacts = await errorCatcher(await contactList());

  const contactById = contacts.find(
    (contact) => contact.id === contactId.toString()
  );

  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await errorCatcher(await contactList());

  const contactToDelete = contacts.find((contact) => contact.id === contactId);

  const newArray = contacts.filter(
    (contact) => contact.id !== contactToDelete.id
  );

  errorCatcher(await fs.writeFile(contactsPath, JSON.stringify(newArray)));

  return contactToDelete;
};

const addContact = async (data) => {
  const { name, email, phone } = data;
  const contacts = await errorCatcher(await contactList());
  const newContact = { id: uuidv4(), name, email, phone };

  const newArray = [...contacts, newContact];

  errorCatcher(await fs.writeFile(contactsPath, JSON.stringify(newArray)));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const id = contactId.toString();
  const contactToUpdate = {
    id,
    name,
    email,
    phone,
  };

  const contacts = await errorCatcher(await contactList());
  const filteredArray = contacts.filter((contact) => contact.id !== id);

  const newArray = [...filteredArray, contactToUpdate];

  errorCatcher(await fs.writeFile(contactsPath, JSON.stringify(newArray)));

  return contactToUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
