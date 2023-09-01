const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  try {
    const contactsJSON = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsJSON);
    return contacts;
  } catch {
    return null;
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return {
      message: `Contact with id ${contactId} has been deleted.`,
    };
  } else {
    return null;
  }
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  const contactToUpdate = contacts[index];
  const updatedContact = { ...contactToUpdate, ...body };

  if (index !== -1) {
    contacts.splice(index, 1, updatedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
