const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const res = data.find((item) => item.id === contactId);
  return res || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [res] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return res;
}

async function addContact({ name, email, phone }) {
  const data = await listContacts();
  const newCont = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newCont);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newCont;
}

async function updateContact(id, { name, email, phone }) {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  data[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[index];
}

async function setFavorite(id) {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  data[index] = { id };
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  setFavorite,
};
