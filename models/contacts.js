const fs = require("fs/promises");
const path = require("path");
require("colors");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.red);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const isContact = contacts.find(({ id }) => id === contactId);
    return isContact;
  } catch (error) {
    console.log(error.red);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const isContact = contacts.findIndex((contact) => contact.id === contactId);
    if (isContact === -1) {
      return null;
    }
    const updateContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2), {
      encoding: "utf-8",
    });
    return updateContacts;
  } catch (error) {
    console.log(error.red);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    if (!name || !email || !phone) {
      return null;
    }
    const contacts = await listContacts();
    if (contacts.find((contact) => contact.name === name)) {
      return false;
    }
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const newContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), {
      encoding: "utf-8",
    });
    return newContact;
  } catch (error) {
    console.log(error.red);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const isContact = contacts.find(({ id }) => id === contactId);
    if (!isContact) {
      return null;
    }
    const updatedContact = {
      ...isContact,
      ...body,
    };
    const rest = contacts.filter((contact) => contact.id !== contactId);
    const updatedContacts = [...rest, updatedContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
      encoding: "utf-8",
    });
    return updatedContact;
  } catch (error) {
    console.log(error.red);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
