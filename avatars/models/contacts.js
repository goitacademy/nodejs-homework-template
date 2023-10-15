const fs = require("node:fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const response = await fs.readFile(contactsPath);
  const contacts = JSON.parse(response);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const matchedContact = contacts.find((contact) => contact.id === contactId);
  return matchedContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToDelete = contacts.find((contact) => contact.id === contactId);
  if (contactToDelete !== undefined) {
    const { name } = contactToDelete;
    const restOfContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(restOfContacts, null, 2));
    console.log(`${name} has deleted!`);
    return true;
  } else {
    console.log(`Contact with ID ${contactId} not found.`);
    return false;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  if (name && email && phone) {
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return true;
  }
  return false;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexToUpdate = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexToUpdate === -1) {
    return "Not found";
  } else {
    contacts[indexToUpdate] = { ...contacts[indexToUpdate], ...body };
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return "Contact updated!";
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
