const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "./contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const rule = !contacts.some((contact) => contact.id === contactId);
  const contact = contacts.find((contact) => contact.id === contactId);
  return rule ? null : contact;
}
async function removeContact(contactId) {
  const contacts = await listContacts();
  const indexRemove = contacts.findIndex((contact) => contact.id === contactId);
  if (indexRemove === -1) {
    return null;
  }
  const [removeItem] = contacts.splice(indexRemove, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  return removeItem;
}
async function addContact(body) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  return newContact;
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const indexUpdate = contacts.findIndex((contact) => contact.id === contactId);
  if (indexUpdate === -1) {
    return null;
  }
  contacts[indexUpdate] = { id: contactId, ...contacts[indexUpdate], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[indexUpdate];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
