const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateList = async (list) =>
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const list = await listContacts();
  const itemId = list.find((item) => item.id === id);
  return itemId || null;
};

const addContact = async (data) => {
  const list = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  list.push(newContact);
  await updateList(list);
  return newContact;
};

const updateContact = async (id, data) => {
  const list = await listContacts();
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  list[index] = { id, ...data };
  await updateList(list);
  return list[index];
};

const removeContact = async (id) => {
  const list = await listContacts();
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = list.splice(index, 1);
  await updateList(list);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
