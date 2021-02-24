const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.join("./model/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);
  return result;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find(({ id }) => id.toString() === contactId);
  return result;
};

const addContact = async (body) => {
  const data = await listContacts();
  const newContact = { id: uuid(), ...body };
  const newListContacts = [...data, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newListContacts));

  return newContact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const result = data.filter(({ id }) => id.toString() !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return result;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const contact = data.find(({ id }) => id.toString() === contactId);

  const newContact = { ...contact, ...body };
  const result = data.map((obj) =>
    obj.id.toString() === contactId ? newContact : obj
  );
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
