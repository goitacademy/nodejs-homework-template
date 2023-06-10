const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((elem) => contactId === elem.id);
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const isContact = await getContactById(contactId);
    if (!isContact) {
      return false;
    } else {
      const filteredContacts = contacts.filter((elem) => elem.id !== contactId);
      await fs.writeFile(
        contactsPath,
        JSON.stringify(filteredContacts),
        "utf-8"
      );
      return true;
    }
  } catch (error) {
    return error;
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    return newContact;
  } catch (error) {
    return error;
  }
};

const updateContact = async (contactId, { email, phone, name }) => {
  try {
    const contacts = await listContacts();
    const isContact = await getContactById(contactId);
    if (!isContact) {
      return;
    } else {
      const [contact] = contacts.filter((elem) => elem.id === contactId);
      if (email) {
        contact.email = email;
      }
      if (phone) {
        contact.phone = phone;
      }
      if (name) {
        contact.name = name;
      }
      await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
      return contact;
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
