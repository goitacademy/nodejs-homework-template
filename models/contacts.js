const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function updateList(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactByID = allContacts.find((contact) => contact.id === contactId);
  return contactByID || null;
}

async function addContact({ name, email, phone }) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await updateList(allContacts);
  return newContact;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const newContactsList = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  await updateList(newContactsList);
  return newContactsList;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateList,
};
