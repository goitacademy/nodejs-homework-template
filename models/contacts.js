const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const list = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(list);
};

const getContactById = async (contactId) => {
  const list = await listContacts();

  const contact = list.find((item) => item.id === contactId);

  return contact || null;
};

const addContact = async (body) => {
  const list = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };

  list.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

  return newContact;
};

const removeContact = async (contactId) => {
  const list = await listContacts();

  const idx = list.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [contact] = list.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

  return contact;
};

const updateContact = async (contactId, body) => {
  const list = await listContacts();

  const idx = list.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  list[idx] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

  return list[idx];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
