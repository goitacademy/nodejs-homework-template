const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const filePath = path.join(__dirname, "contacts.json");
const contacts = async (contact) =>
  fs.writeFile(filePath, JSON.stringify(contact, null, 2));
async function listContacts() {
  const list = await fs.readFile(filePath);
  return JSON.parse(list);
}

async function getContactById(contactId) {
  const list = await listContacts();
  const oneContact = list.find((item) => item.id === contactId);
  return oneContact || null;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const findIndex = list.findIndex((item) => item.id === contactId);
  if (findIndex === -1) return null;
  const [result] = list.splice(findIndex, 1);
  await contacts(list);
  return result;
}

async function addContact({ name, email, phone }) {
  const list = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  list.push(newContact);
  await contacts(list);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
