const fs = require("fs").promises;
const path = require("path");
const { randomUUID } = require("crypto");

const mainPath = __dirname;
const fileName = path.basename("contacts.json");
const directoryName = path.dirname("contacts.json");
const contactsPath = path.join(mainPath, directoryName, fileName);

const listContacts = async () => {
  try {
    const contacts = await fs
      .readFile(contactsPath, "utf-8")
      .then((data) => JSON.parse(data))
      .catch((error) => console.log(error.message));

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = { id: randomUUID(), ...body };
    const contacts = await listContacts();
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    const updatedContact = { ...contacts[index], ...body };
    contacts.splice(index, 1, updatedContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));

    return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
