const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const res = contacts.find((contact) => contact.id === contactId);
  return res || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const id = contacts.findIndex((contact) => contact.id === contactId);
  if (id === -1) {
    return null;
  }
  const [result] = contacts.splice(id, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  if (!body) {
    return null;
  }
  const contacts = await listContacts();
  const contact = await getContactById(contactId);
  if (!contact) {
    return null;
  }
  const newContact = Object.assign(contact, body);
  contacts.splice(
    contacts.findIndex((contact) => contact.id === contactId),
    1,
    newContact
  );

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
