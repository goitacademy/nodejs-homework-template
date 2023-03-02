const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve("./models/contacts.json");

async function listContacts() {
  const listOfContacts = await fs.readFile(contactsPath, "UTF-8");
  return JSON.parse(listOfContacts);
}

async function getContactById(contactId) {
  const parsedContacts = await listContacts();

  const contact = parsedContacts.find((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const parsedContacts = await listContacts();

  const contactToBeDeleted = parsedContacts.find(({ id }) => id === contactId);
  const filteredContacts = parsedContacts.filter(
    (contact) => contact !== contactToBeDeleted
  );

  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));

  return contactToBeDeleted;
}

async function addContact({ name, email, phone }) {
  const parsedContacts = await listContacts();

  // Looking for the biggest id number (could be replaced by some id generator)
  let biggestId = 0;
  parsedContacts.map(({ id }) => (+id > biggestId ? (biggestId = +id) : null));
  const newContactID = biggestId + 1;

  const newContact = {
    id: newContactID.toString(), // Converting to String to save DB var's types from example
    name: name.toString(),
    email: email.toString(),
    phone: phone.toString(),
  };

  parsedContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(parsedContacts));

  return newContact;
}

async function updateContact(contactId, body) {
  const parsedContacts = await listContacts();
  const index = parsedContacts.findIndex(contact => String(contact.id) === String(contactId));
  if (index === -1) {
    return null;
  }
  const updatedContact = { ...parsedContacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};