const fs = require("fs/promises");
const { json } = require("express");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
const listContacts = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    return contacts;
  } catch {
    console.error("Error getting contact  ", error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    contactId = decodeURIComponent(contactId);

    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactById = contacts.find((contact) => contact.id === contactId);

    return contactById;
  } catch {
    console.error("Error getting contact by ID: ", error);
    throw error;
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
