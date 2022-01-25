const fs = require("fs").promises;
const path = require("path");
const getID = require("uniqid");

const contactsPath = path.join(__dirname, "contacts.json");

async function takeAllContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function listContacts() {
  return await takeAllContacts();
}

async function getContactById(contactId) {
  const contacts = await takeAllContacts();
  const result = contacts.find(
    (contact) => contact.id.toString() === contactId.toString()
  );
  console.table(result);
  return result;
}

async function removeContact(contactId) {
  const contacts = await takeAllContacts();
  const result = contacts.filter(
    (contact) => contact.id.toString() !== contactId.toString()
  );
  if (result.length < contacts.length) {
    fs.writeFile(contactsPath, JSON.stringify(result));
    return true;
  } else return false;
}

async function addContact({ name, email, phone }) {
  const contacts = await takeAllContacts();
  const newContact = { id: getID(), name, email, phone };
  const newContactList = [...contacts, newContact];
  fs.writeFile(contactsPath, JSON.stringify(newContactList));
  return newContact;
}

async function updateContact(id, patch) {
  const contacts = await takeAllContacts();
  const contactIndex = contacts.findIndex((contact) => id === contact.id);
  if (contactIndex === -1) return false;
  else {
    const refreshContact = {
      ...contacts[contactIndex],
      ...patch,
      id: contacts[contactIndex].id,
    };
    contacts.splice(contactIndex, 1, refreshContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[contactIndex];
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
