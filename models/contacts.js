const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = require("./contactsPatch");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => String(contact.id) === String(id));
  if (!result) {
    return null;
  }

  return result;
};

const removeContact = async (id) => {};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2),
    "utf8"
  );
  return newContact;
};

const updateContact = async (id, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
