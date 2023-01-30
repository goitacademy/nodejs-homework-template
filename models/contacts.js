const fsp = require("fs/promises");
const shortid = require("shortid");
const path = require("path");
const { createHttpException } = require("../helpers/create-http-exception");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContactList = async (contacts) =>
  await fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getAll = async () => {
  const contacts = await fsp.readFile(contactsPath);
  console.log(contacts);
  const result = JSON.parse(contacts);
  return result;
};

const getById = async (contactId) => {
  const contacts = await getAll();

  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw createHttpException(404, "The book is not found");
  }
  return contact;
};

const removeById = async (contactId) => {
  const contacts = await getAll();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw createHttpException(404, "Not found");
  }

  contacts.splice(index, 1);

  await updateContactList(contacts);
};

const create = async (body) => {
  const contacts = await getAll();

  const newContact = {
    id: shortid.generate(),
    ...body,
  };

  contacts.push(newContact);

  await updateContactList(contacts);
  return newContact;
};

const updateById = async (id, data) => {
  const contacts = await getAll();

  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    throw createHttpException(404, "Not found");
  }

  contacts[index] = { id, ...data };
  await updateContactList(contacts);

  return contacts[index];
};

module.exports = {
  getAll,
  getById,
  create,
  removeById,
  updateById,
};
