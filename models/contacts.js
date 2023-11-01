const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const serchedContact = allContacts.find(
    (contact) => contact.id === contactId
  );

  return serchedContact;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);

  const foundContact = allContacts.find((contact) => contact.id === contactId);

  if (!foundContact) {
    return false;
  }

  const filterContacts = allContacts.filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(contactsPath, JSON.stringify(filterContacts, null, 2));
  return true;
};

const addContact = async (body) => {
  const { nanoid } = require("nanoid");

  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);

  const newContact = { id: nanoid(), ...body };
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
