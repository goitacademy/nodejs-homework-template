const fs = require("fs").promises;
const res = require("express/lib/response");
const path = require("path");

const contactsPath = path.resolve(__dirname, "../db/contacts.json");

async function writeContacts(list) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(list), "utf8");
  } catch (err) {
    console.log(err);
  }
}

async function listContacts() {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(list);
  } catch (err) {
    console.log(err);
  }
}

async function getById(contactId) {
  const list = await listContacts();
  return list.find((x) => x.id === contactId);
}

async function removeContact(contactId) {
  const list = await listContacts();
  const removeList = list.filter((x) => x.id !== contactId);
  if (list.length !== removeList.length) {
    await writeContacts(removeList);
    return true;
  }
  return false;
}

async function addContact(data) {
  const list = await listContacts();
  const id = (+list[list.length - 1].id + 1).toString();
  await writeContacts([...list, { id, ...data }]);
  return { id, ...data };
}

async function updateContact(contactId, data) {
  const list = await listContacts();
  const index = list.findIndex((x) => x.id === contactId);
  if (index === -1) return null;
  list[index] = { ...list[index], ...data };
  await writeContacts(list);
  return list[index];
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
