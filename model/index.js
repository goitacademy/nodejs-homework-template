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

const removeContact = async contactId => {};

const addContact = async body => {
  try {
    const contacts = await listContacts();
    const id = shortid();
    const newContact = { ...body, id };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
