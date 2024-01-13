const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();

  const condition = !contactsList.some((contact) => contact.id === contactId);
  const contact = contactsList.find((contact) => contact.id === contactId);
  return condition ? null : contact;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();

  const idxDelete = contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  if (idxDelete === -1) {
    return null;
  }
  const [deleteContact] = contactsList.splice(idxDelete, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return deleteContact;
}

async function addContact(userData) {
  const contactsList = await listContacts();

  const newContact = {
    id: nanoid(),
    ...userData,
  };

  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
}

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
