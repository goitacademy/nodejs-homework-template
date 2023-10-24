const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts:", error);
    return [];
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((el) => el.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((el) => el.id !== contactId);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return true;
  } catch (error) {
    console.error("Error removing contact:", error);
    return false;
  }
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: Date.now().toString(), ...body };
  contacts.push(newContact);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    console.error("Error updating contact:", error);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
