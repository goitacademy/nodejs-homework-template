const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");
require("colors");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(`Error:${err.message}`.red);
  }
};

const getById = async (contactId) => {
  try {
    const data = await listContacts();
    const contact = data.filter(({ id }) => id === contactId);
    if (!contact) {
      console.log(`Contact with id=${contactId} doesn't exist.`.yellow);
      return null;
    }
    return contact;
  } catch (err) {
    console.log(`Error:${err.message}`.red);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      console.log(`Contact with id=${contactId} doesn't exist`.yellow);
      return null;
    }
    const removedContact = contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  } catch (err) {
    console.log(`Error:${err.message}.`.red);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    let contacts = await listContacts();
    const newContact = {
      id: uid(12),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    return console.log(`Error: ${err.message}`.red);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    console.log(`Contact with id=${contactId} doesn't exist`.yellow);
    return null;
  }

  const contactToUpdate = contacts[index];
  const updatedContact = { ...contactToUpdate, ...body };

  contacts.splice(index, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
