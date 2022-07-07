const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "/contacts.json");
const newId = require("bson-objectid");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    if (!result) return null;
    return result;
  } catch (error) {
    return error;
  }
};

const addContact = async (body) => {
  const newContact = { ...body, id: newId() };
  const contacts = await listContacts();
  const searchedContact = newContact.name.toLowerCase();
  if (
    contacts.some((element) => element.name.toLowerCase() === searchedContact)
  )
    return null;
  await fs.writeFile(
    contactsPath,
    JSON.stringify([...contacts, newContact], {}, 2)
  );
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  if (contacts.some((item) => item.id === contactId)) {
    const newContacts = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, {}, 2));
    return true;
  }
  return false;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = await contacts.find((item) => item.id === contactId);
  if (!contact) return null;
  const idx = contacts.findIndex((element) => element.id === contactId);
  const updatedContact = { ...contact, ...body };
  contacts.splice(idx, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, {}, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
