const animalRepository = require("./contacts.json");
const readJsonFiles = require("../untils/readJsonFiles");
const writeJsonFile = require("../untils/writeJsonFile");
const path = require("path");
const { nanoid } = require("nanoid");
const ERROR_TYPES = require("../constants/errorTypes");
const createError = require("../untils/createError");
// const fs = require('fs/promises')
const CONTACTS_PATH = path.join(__dirname, "./contacts.json");
const listContacts = async () => {
  const contactsList = await readJsonFiles(CONTACTS_PATH);
  return contactsList;
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contact = contactsList.find((contact) => contact.id === contactId);
  if (!contact) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: `Not found`,
      data: {},
    });
    throw error;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const contactIndex = contactList.findIndex((e) => e.id === contactId);
  if (contactIndex === -1) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: `Not found`,
      data: {},
    });
    throw error;
  }
  contactList.splice(contactIndex, 1);
  writeJsonFile(CONTACTS_PATH, contactList);
  return "contact deleted";
};

const addContact = async (body) => {
  const contact = {
    id: nanoid(),
    ...body,
  };
  const contactsList = await listContacts();
  contactsList.push(contact);
  await writeJsonFile(CONTACTS_PATH, contactsList);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contactList = await listContacts();
  const { name, email, phone } = body;
  const changeContactIndex = contactList.findIndex((e) => e.id === contactId);
  const changeContact = contactList[changeContactIndex];
  if (changeContactIndex === -1) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: `Not found`,
      data: {},
    });
    throw error;
  }

  contactList[changeContactIndex] = {
    ...changeContact,
    name: name || changeContact.name,
    email: email || changeContact.email,
    phone: phone || changeContact.phone,
  };
  await writeJsonFile(CONTACTS_PATH, contactList);
  return contactList[changeContactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
