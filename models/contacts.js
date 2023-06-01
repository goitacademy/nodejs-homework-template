const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const result = list.find((el) => el.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const list = await listContacts();
  const index = list.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = list.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const list = await listContacts();
  const newUser = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  list.push(newUser);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return newUser;
};

const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const index = list.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  list[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return list[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
