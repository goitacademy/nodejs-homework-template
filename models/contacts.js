// const fs = require('fs/promises')

const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const idMaker = async () => {
  const contacts = await listContacts();
  const sortedContactsId = contacts.map((el) => Number(el.id)).sort((a, b) => a - b);
  let checkId = false;
  const contactsId = sortedContactsId.reduce((acc, el, idx, arr) => {
    if (!checkId && arr[idx + 1] - el > 1) {
      acc = el + 1;
      checkId = true;
    }
    return acc;
  }, sortedContactsId[sortedContactsId.length - 1] + 1);
  return String(contactsId);
};

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === String(contactId));
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { id: await idMaker(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  const updatedContact = { ...contact, ...body };
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => {
    return el.id === String(contactId);
  });
  if (index === -1) {
    return null;
  }
  contacts.splice(index, 1, updatedContact);
  await updateContacts(contacts);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
