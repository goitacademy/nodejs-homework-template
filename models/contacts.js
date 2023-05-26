const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { HttpError } = require("../helpers/index");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  const contactsList = (await fs.readFile(contactsPath)).toString();
  return JSON.parse(contactsList);
};

const getContactById = async (contactId) => {
  const contactsArr = await listContacts();
  const findContact = contactsArr.find(elem => elem.id === contactId);
  return findContact;
};

const removeContact = async (contactId) => {
  const contactsArr = await listContacts();
  const getContactIndex = contactsArr.findIndex(
    (elem) => elem.id === contactId
  );
  let deletedContact;

  if (getContactIndex === -1) {
    throw HttpError(404);
  }
  deletedContact = contactsArr.splice(getContactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));

  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  let contactsArr = await listContacts();

  let newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  contactsArr.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));

  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const getContactIndex = contacts.findIndex((elem) => elem.id === contactId);
  const id = contactId;

  if (getContactIndex === -1) return null;

  contacts[getContactIndex] = { id , name, email, phone };

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[getContactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
