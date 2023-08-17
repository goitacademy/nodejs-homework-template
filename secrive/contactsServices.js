const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
// const contactsList = require("./contacts.json");
const contactsPath = path.join(__dirname, "../models/contacts.json");

const getAllContactsService = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactByIdService = async (contactId) => {
  const contacts = await getAllContactsService();
  const [contact] = contacts.filter(({ id }) => contactId === id);
  return contact;
};

const addContactService = async (body) => {
  const contacts = await getAllContactsService();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContactService = async (contactId) => {
  const contacts = await getAllContactsService();
  const deletedContact = contacts.filter(({ id }) => contactId !== id);

  if (deletedContact.length !== contacts.length) {
    await fs.writeFile(contactsPath, JSON.stringify(deletedContact, null, 2));
    return true;
  }
  return false;
};

const updateContactService = async (contactId, body) => {
  const contacts = await getAllContactsService();
  const findContactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (findContactIndex === -1) {
    return false;
  }
  const changedContact = { ...contacts[findContactIndex], ...body };
  contacts.splice(findContactIndex, 0, changedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return changedContact;
};

module.exports = {
  getAllContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
