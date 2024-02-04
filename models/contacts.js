const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsFilePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Unable to fetch contacts");
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    throw new Error("Unable to fetch contact");
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      contactsFilePath,
      JSON.stringify(updatedContacts, null, 2)
    );
    return true;
  } catch (error) {
    throw new Error("Unable to delete contact");
  }
};

const addContact = async (body) => {
  try {
    const newContact = { id: uuidv4(), ...body };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error("Unable to add contact");
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    throw new Error("Unable to update contact");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
