const { nanoid } = require("nanoid");
const fs = require("fs/promises");
// const fs = require('fs').promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

const getContactById = async (contactId) => {
  return (
    JSON.parse(await fs.readFile(contactsPath)).find(
      (value) => value.id === contactId
    ) || null
  );
};

const removeContact = async (contactId) => {
  // get full list from file
  const valueArray = await listContacts();

  // rewrite new array to file
  await fs.writeFile(
    contactsPath,
    JSON.stringify(
      valueArray.filter((value) => value.id != contactId),
      null,
      2
    )
  );
  return valueArray.find((value) => value.id === contactId) || null;
};

const addContact = async (body) => {
  const newContact = { id: nanoid(), ...body };

  // get full list from file
  const value = await listContacts();

  // add new contact to array
  value.push(newContact);

  // rewrite new array to file
  await fs.writeFile(contactsPath, JSON.stringify(value, null, 2));

  return newContact;
};

const updateContact = async (id, data) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((value) => value.id === id);

  if (index === -1) return null;
  contacts[index] = { id, ...data };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
