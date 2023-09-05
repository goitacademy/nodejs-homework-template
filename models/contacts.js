const path = require("path");
const { nanoid } = require("nanoid");

const { readJSONFromFile, writeJSONToFile } = require("../utils");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const list = await readJSONFromFile(contactsPath);

  return list;
};

const getContactById = async (contactId) => {
  const list = await readJSONFromFile(contactsPath);

  const index = list.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }

  return list[index];
};

const addContact = async (body) => {
  const newContact = { id: nanoid(), ...body };
  const list = await readJSONFromFile(contactsPath);

  list.push(newContact);

  await writeJSONToFile(contactsPath, list);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const list = await readJSONFromFile(contactsPath);
  const index = list.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }

  list[index] = { ...list[index], ...body };
  await writeJSONToFile(contactsPath, list);

  const updatedContact = list[index];
  return updatedContact;
};

const removeContact = async (contactId) => {
  const list = await readJSONFromFile(contactsPath);
  const index = list.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }

  const [deletedContact] = list.splice(index, 1);

  await writeJSONToFile(contactsPath, list);
  return deletedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
