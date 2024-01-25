const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const filePath = path.join(__dirname, "contacts.json");
function writeContacts(contacts) {
  return fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2));
}
const listContacts = async () => {
  const data = await fs.readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return undefined;
  }

  const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];

  await writeContacts(newContacts);

  return contacts[index];
}

const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = { id: crypto.randomUUID(), ...body  };

  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return undefined;
  }

  const newContact = { id, ...body  };

  contacts[index] = newContact;

  await writeContacts(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
