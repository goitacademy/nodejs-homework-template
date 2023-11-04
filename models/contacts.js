const fs = require("fs/promises");
const crypto = require("node:crypto");
const path = require("node:path");

const contactsPath = path.join(__dirname, "contacts.json");

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "UTF-8" });
    return JSON.parse(data);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function writeContacts(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  } catch (error) {
    throw new Error(error.message);
  }
}

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contactToFind = contacts.find((contact) => contact.id === contactId);

  if (contactToFind) {
    return contactToFind;
  }

  return null;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const contactToRemove = contacts.find((contact) => contact.id === contactId);

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await writeContacts(updatedContacts);

  if (!contactToRemove) {
    return null;
  } else {
    return contactToRemove;
  }
};

const addContact = async (body) => {
  const contacts = await readContacts();
  const contactToAdd = {
    id: crypto.randomUUID(),
    ...body,
  };

  contacts.push(contactToAdd);
  await writeContacts(contacts);

  return contactToAdd;
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      throw new Error("Contact has not been found");
    }

    const newContact = { ...body, id: contactId };

    const updatedContacts = [
      ...contacts.slice(0, index),
      newContact,
      ...contacts.slice(index + 1),
    ];

    await writeContacts(updatedContacts);

    return newContact;
  } catch (error) {
    throw new Error("Error updating contact: " + error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
