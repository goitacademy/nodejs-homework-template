const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const ID = uuidv4();

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
      throw new Error("Contact not found");
    }
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: ID, ...body };
    const newList = [...contacts, newContact];

    fs.writeFile(contactsPath, JSON.stringify(newList));
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
