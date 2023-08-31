const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  try {
    const contactsJSON = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsJSON);
    return contacts;
  } catch {
    console.log("error when reading the file");
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return { message: "contact deleted" };
  } else {
    return { message: "Not found" };
  }
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
