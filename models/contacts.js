const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

const writeContact = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return await contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const filtredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  if (filtredContacts.length === contacts.length) {
    return null;
  }
  await writeContact(filtredContacts);

  return filtredContacts;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = { id: randomUUID(), ...body };
  contacts.push(newContact);

  await writeContact(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIdx = await contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIdx === -1) {
    return null;
  }

  contacts[contactIdx] = { ...contacts[contactIdx], ...body };

  await writeContact(contacts);

  return contacts[contactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
