const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts.toString());
  } catch (error) {
    throw new Error("Error getting contacts:" + error);
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === id);
    if (contact) {
      return contact;
    }
    return null;
  } catch (error) {
    throw new Error("Error trying read contact by ID...");
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => parseInt(contact.id) === parseInt(id)
    );
    if (index === -1) {
      return null;
    }
    const removedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  } catch (error) {
    throw new Error("Error trying remove contact ");
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const contact = {
      id: contacts.length + 1,
      name,
      email,
      phone,
    };
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (error) {
    throw new Error("Error triying create contact");
  }
};

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => parseInt(contact.id) === parseInt(id)
    );
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...body };
      const updatedContact = contacts[index];
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return updatedContact;
    }
    return null;
  } catch (error) {
    throw new Error("Error trying updating contact ");
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
