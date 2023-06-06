const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.error("An error occurred");
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find((contact) => contact.id === contactId);

    return foundContact;
  } catch (error) {
    console.error("An error occurred");
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    if (contacts.some((contact) => contact.id === contactId)) {
      const newList = contacts.filter((contact) => contact.id !== contactId);

      fs.writeFile(contactsPath, JSON.stringify(newList));
      return "Contact deleted";
    } else {
      console.error("Contact can't be deleted because it doesn't exist.");
    }
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), ...body };
    const newList = [...contacts, newContact];

    fs.writeFile(contactsPath, JSON.stringify(newList));
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex === -1) {
      return console.error("Contact not found");
    } else {
      const updatedContact = { ...contacts[contactIndex], ...body };
      contacts.splice(contactIndex, 1, updatedContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return updatedContact;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
