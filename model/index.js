/* eslint-disable quotes */
/* eslint-disable semi */
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return data.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const deletedContact = data.find((item) => item.id === contactId);
  return deletedContact;
};

const addContact = async (body) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const dtoInCreateContact = { id: data[data.length - 1].id + 1, ...body };
  const newContacts = [...data, dtoInCreateContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return dtoInCreateContact;
};

const updateContact = async (contactId, body) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const contactToUpdate = data.find((item) => item.id === contactId);
  const newContact = { ...contactToUpdate, ...body };
  const updatedContacts = [...data];
  updatedContacts[contactId - 1] = newContact;
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
