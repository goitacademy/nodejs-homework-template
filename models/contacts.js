const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Cannot read contacts file");
  }
};

const getById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === Number(contactId));
  } catch (error) {
    throw new Error("Cannot get contact by ID");
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts.length < contacts.length;
  } catch (error) {
    throw new Error("Cannot remove contact");
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: contacts.length
        ? Math.max(contacts.map((contact) => contact.id)) + 1
        : 1,
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error("Cannot add contact");
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...body };
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contacts[index];
    }
    return null;
  } catch (error) {
    throw new Error("Cannot update contact");
  }
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
