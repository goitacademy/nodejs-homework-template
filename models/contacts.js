const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("models/contacts.json");

async function readList() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getListContacts() {
  const data = await readList();
  return data;
}

async function getContactById(contactId) {
  const list = await readList();
  const result = list.find((contacts) => contacts.id === contactId.toString());
  return result || null;
}

async function removeContact(contactId) {
  const list = await readList();
  const defineContact = list.find((contact) => contact.id === contactId);
  const result = list.filter((contact) => contact.id !== contactId.toString());
  await fs.writeFile(contactsPath, JSON.stringify(result), "utf8");

  return defineContact;
}

async function addContact({ name, email, phone }) {
  const id = shortid.generate();
  const list = await readList();
  console.log(email);
  const newContact = { id, name, email, phone };

  const createdNewList = [...list, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(createdNewList), "utf8");

  return newContact;
}

async function updateContact(contactId, { name, email, phone }) {
  const list = await readList();
  const index = list.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  list[index] = { contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2), "utf8");
  return list[index];
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
