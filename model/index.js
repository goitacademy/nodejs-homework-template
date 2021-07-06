const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
// const contacts = require("./contacts.json");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const contact = contactsList.find(({ id }) => id.toString() === contactId);

    if (!contact) {
      return;
    }
    return contact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const index = contactsList.findIndex(
      ({ id }) => id.toString() === contactId
    );

    if (index === -1) {
      return;
    }

    const removedContact = contactsList[index];
    const filteredContacts = contactsList.filter(
      ({ id }) => id.toString() !== contactId
    );
    await rewriteFile(filteredContacts);
    return removedContact;
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const newContact = { id: v4(), name, email, phone };
    const contactsList = await listContacts();
    const updateContactsList = [...contactsList, newContact];
    await rewriteFile(updateContactsList);
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return;
    }
    const contactsList = await listContacts();

    const updatedContact = { ...contact, ...body };
    const updateContactsList = [
      ...contactsList.filter(({ id }) => id.toString() !== contactId),
      updatedContact,
    ];
    await rewriteFile(updateContactsList);
    return updatedContact;
  } catch (error) {
    throw error;
  }
};

async function rewriteFile(contacts) {
  try {
    const stringifiedContacts = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, stringifiedContacts);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
