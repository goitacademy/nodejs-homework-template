const fs = require("node:fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

const readContact = async () => {
  const result = await fs.readFile(contactsPath, {
    encoding: "utf-8",
  });
  return JSON.parse(result);
};

const writeContact = (contacts) => {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await readContact();
  console.log("list of ContactsPhone: ");
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readContact();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
};

async function removeContact(contactId) {
  const contacts = await readContact();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];
  await writeContact(newContacts);
  return contacts[index];
}

const addContact = async (data) => {
  const contacts = await readContact();
  const newAddContact = {
    id: crypto.randomUUID(),
    ...data,
  };
  contacts.push(newAddContact);
  await writeContact(contacts);

  return newAddContact;
};

const updateContact = async (id, body) => {
  const contacts = await readContact();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const currentContact = await getContactById(id);
  contacts[index] = { ...currentContact, ...body };
  await writeContact(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
