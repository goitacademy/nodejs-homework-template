const fs = require("node:fs/promises");

const path = require("node:path");

const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "UTF-8" });
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

const listContacts = async () => {
  const contactsList = await readContacts();

  return contactsList;
};

const getContactById = async (contactId) => {
  const contactsList = await readContacts();
  const contact =
    contactsList.find((contact) => contact.id === contactId) || null;

  return contact;
};

const removeContact = async (contactId) => {
  const contactsList = await readContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const deleteContact = [
    contactsList.slice(0, index),
    ...contactsList.slice(index + 1),
  ];
  await writeContacts(deleteContact);

  return contactsList[index];
};

const addContact = async (name, email, phone) => {
  const contactsList = await readContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    phone: phone,
  };
  contactsList.push(newContact);

  await writeContacts(contactsList);
  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  const contactsList = await readContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  contactsList[index] = {
    id: contactId,
    name: name,
    email: email,
    phone: phone,
  };

  await writeContacts(contactsList);
  return contactsList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
