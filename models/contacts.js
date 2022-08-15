const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);
  return result;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((data) => data.id === id);
  if (!result) {
    return contacts;
  }
  return result;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const result = contacts.filter((item) => item.id !== id);
  if (result) {
    return contacts;
  }
  await updateContacts(contacts);
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await updateContacts(contacts);
  return newContacts;
};

const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const result = contacts.find((data) => data.id === id);
  if (!result) {
    return contacts;
  }
  result.name = name;
  result.email = email;
  result.phone = phone;
  await updateContacts(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
