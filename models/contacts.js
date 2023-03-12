const fs = require("fs/promises");
const path = require("path");

const PATH = path.join(__dirname, "contacts.json");

const { v4: uuidv4 } = require("uuid");
const AppError = require("../utils/appError");

const listContacts = async () => {
  try {
    const data = await fs.readFile(PATH);
    const contactsList = JSON.parse(data);
    return contactsList;
  } catch (error) {
    return new AppError(500, error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();

    const contact = contactsList.find((contact) => contact.id === contactId);

    return contact;
  } catch (error) {
    return new AppError(500, error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();

    const newContactList = contactsList.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(PATH, JSON.stringify(newContactList));
    return newContactList;
  } catch (error) {
    return new AppError(500, error);
  }
};

const addContact = async (body) => {
  try {
    const contactsList = await listContacts();

    const { name, email, phone } = body;

    const newContact = { id: uuidv4(), name, email, phone };
    contactsList.push(newContact);

    await fs.writeFile(PATH, JSON.stringify(contactsList));
    return newContact;
  } catch (error) {
    return new AppError(500, error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsList = await listContacts();

    const { name, email, phone } = body;

    const idx = contactsList.findIndex((contact) => contact.id === contactId);
    const changedContact = contactsList[idx];

    if (name) changedContact.name = name;
    if (email) changedContact.email = email;
    if (phone) changedContact.phone = phone;

   contactsList[idx] = changedContact;

    await fs.writeFile(PATH, JSON.stringify(contactsList));
    return contactsList[idx];
  } catch (error) {
    return new AppError(500, error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
