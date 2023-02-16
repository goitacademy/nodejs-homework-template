const { nanoid } = require("nanoid");
const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(`${contactsPath}`);

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();

  const result = data.find((contact) => contactId === contact.id);

  return result || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();

  const deletedContact = await getContactById(contactId);

  if (!deletedContact) return null;

  const newData = data.filter((contact) => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));

  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();

  const newContact = { name, email, phone, id: nanoid() };

  const dataNew = [...data, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(dataNew, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    return null;
  }

  const result = { ...contact, ...body };

  const contacts = await listContacts();

  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  const updatedContactsArray = [...filteredContacts, result];

  await fs.writeFile(
    contactsPath,
    JSON.stringify(updatedContactsArray, null, 2)
  );

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
