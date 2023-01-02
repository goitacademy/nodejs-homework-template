const { write } = require("fs");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

async function readContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function writeContacts(data) {
  fs.writeFile(contactsPath, JSON.stringify(data));
}

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((c) => c.id == contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const dataToWrite = contacts.filter((c) => c.id !== contactId);
  writeContacts(dataToWrite);
};

const addContact = async (body) => {
  const contacts = await readContacts();
  contacts.push(body);
  await writeContacts(contacts);
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await readContacts();
  contacts.forEach((e) => {
    if (e.id == contactId) {
      e.name = name;
      e.email = email;
      e.phone = phone;
    }
  });
  await writeContacts(contacts);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
