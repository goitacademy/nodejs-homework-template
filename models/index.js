const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
const updateAllContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const data = await listContacts();
  const contact = data.filter((el) => el.id === id);
  if (contact.length === 0) {
    return null;
  }
  return contact;
};

const removeContact = async (id) => {
  const data = await listContacts();
  const getIndex = data.findIndex((el) => el.id === id);

  if (getIndex === -1) {
    return null;
  }

  const [removeEl] = data.splice(getIndex, 1);
  await updateAllContacts(data);
  return removeEl;
};

const addContact = async ({ id, name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  data.push(newContact);
  await updateAllContacts(data);
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const data = await listContacts();
  const getIndex = data.findIndex((el) => el.id === id);
  if (getIndex === -1) {
    return null;
  }
  const contact = { id, name, email, phone };
  data[getIndex] = contact;
  await updateAllContacts(data);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
