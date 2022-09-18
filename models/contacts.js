const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const updatedContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const filteredContact = contacts.find(({ id }) => id === contactId);
  return filteredContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactDelete = contacts.filter((el) => el.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contactDelete));
  return { message: "contact deleted" };
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const userId = contacts.map((item) => +item.id);
  const newContact = {
    id: String(Math.max(...userId) + 1),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updatedContacts(contacts);
  return newContact;
}

async function updateContact(contactId, { name, email, phone }) {
  const contacts = await listContacts();
  const contactsIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactsIndex === -1) {
    return null;
  }
  contacts[contactsIndex] = { id: contactId, name, email, phone };
  await updatedContacts(contacts);
  return contacts[contactsIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
