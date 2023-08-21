const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "contacts.json");

async function read() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}
function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
  const getAllContacts = await read();

  return getAllContacts;
}

async function getContactById(contactId) {
  const getAllContact = await read();
  const findContactById = getAllContact.find(
    (contact) => contact.id === contactId
  );
  if (!findContactById) {
    return null;
  }
  return findContactById;
}

async function removeContact(contactId) {
  const getAllContact = await read();
  const index = getAllContact.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = getAllContact[index];
  const newContactBooks = getAllContact.filter(
    (contact) => contact.id !== contactId
  );

  await write(newContactBooks);

  return removedContact;
}

async function addContact({ name, email, phone }) {
  const getAllContact = await read();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  getAllContact.push(newContact);
  await write(getAllContact);

  return newContact;
}

async function updateContact(contactId, body) {
  const getAllContact = await read();
  const index = getAllContact.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  getAllContact[index] = { ...body, id: contactId };

  await write(getAllContact);

  return { ...body, id: contactId };
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
