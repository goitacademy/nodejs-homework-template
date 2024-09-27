const uuid = require("uuid").v4;
const fs = require("fs/promises");
const path = require("path");

const pathToJson = path.join("models", "contacts.json");

const listContacts = async () => {
  const contactsDB = await fs.readFile(pathToJson);

  const contacts = JSON.parse(contactsDB);
  return contacts;
};

const removeContact = async (contactId) => {
  const contactsDB = await fs.readFile(pathToJson);

  const contacts = JSON.parse(contactsDB);

  const index = contacts.findIndex((c) => c.id === contactId);
  contacts.splice(index, 1);

  await fs.writeFile(pathToJson, JSON.stringify(contacts));
};

const addContact = async (value) => {
  const newContact = {
    id: uuid(),
    ...value,
  };

  const contactsDB = await fs.readFile(pathToJson);

  const contacts = JSON.parse(contactsDB);
  contacts.push(newContact);

  await fs.writeFile(pathToJson, JSON.stringify(contacts));

  return newContact;
};

const updateContact = async (contactId, updateData) => {
  const contactsDB = await fs.readFile(pathToJson);

  const contacts = JSON.parse(contactsDB);
  const index = contacts.findIndex((c) => c.id === contactId);

  contacts[index] = { ...contacts[index], ...updateData };

  await fs.writeFile(pathToJson, JSON.stringify(contacts));

  return contacts[index];
};

module.exports = {
  listContacts,
  removeContact,
  addContact,
  updateContact,
};
