/* eslint-disable quotes */
/* eslint-disable semi */

const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
// const contacts = require("./contacts.json");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const contact = await contacts.find(item => item.id.toString() === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const newContactsList = contacts.filter(
      item =>
        item.id
          .toString()
          .toLowerCase()
          .trim() !==
        contactId
          .toString()
          .toLowerCase()
          .trim()
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    return newContactsList;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async body => {
  try {
    const contacts = await listContacts();
    const id = shortid();
    const newContact = { id, ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      item =>
        item.id
          .toString()
          .toLowerCase()
          .trim() !==
        contactId
          .toString()
          .toLowerCase()
          .trim()
    );
    if (!contact) return null;
    const updContact = { contactId, ...body };
    contacts.push(updContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return updContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
