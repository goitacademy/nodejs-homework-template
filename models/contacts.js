const path = require("path");
const { nanoid } = require("nanoid");

const { readJSONFromFile, writeJSONToFile, getIndex } = require("../utils");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const list = await readJSONFromFile(contactsPath);

  return list;
};

const getContactById = async (contactId) => {
  const list = await readJSONFromFile(contactsPath);
  const index = getIndex(list, contactId);
  if (index === null) {
    return index;
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
  const index = getIndex(list, contactId);

  if (index === null) {
    return index;
  }

  list[index] = { ...list[index], ...body };
  await writeJSONToFile(contactsPath, list);

  const updatedContact = list[index];
  return updatedContact;
};

const removeContact = async (contactId) => {
  const list = await readJSONFromFile(contactsPath);
  const index = getIndex(list, contactId);

  if (index === null) {
    return index;
  }

  const [conDel] = list.splice(index, 1);

  await writeJSONToFile(contactsPath, list);
  return conDel;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
