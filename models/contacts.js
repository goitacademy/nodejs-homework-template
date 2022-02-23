const fs = require("fs/promises");
const path = require("path");
// const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await getAll();
  const result = contacts.find((contact) => contact.id === id);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async ({ name, phone, email }) => {
  const contacts = await getAll();
  const ids = contacts.map((contact) => contact.id);
  const id = String(Math.max(...ids) + 1);
  const newContact = { name, email, phone, id };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateById = async (id, data) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...data, id };
  await updateContacts(contacts);
  return contacts[idx];
};

const removeById = async (id) => {
  const contacts = await getAll();
  const deleteContact = contacts.find((contact) => contact.id === id);
  if (!deleteContact) {
    return null;
  }
  const newContacts = contacts.filter((contact) => contact.id !== id);
  await updateContacts(newContacts);
  return deleteContact;
};

module.exports = {
  removeById,
  addContact,
  getContactById,
  getAll,
  updateById,
};
