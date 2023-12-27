const fs = require("fs").promises;
const path = require("path");

const contactsFilePath = path.join(__dirname, "contacts.json");

let contacts = [];

const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Jeśli plik nie istnieje, utwórz go z pustą tablicą
    if (error.code === "ENOENT") {
      await fs.writeFile(contactsFilePath, "[]", "utf-8");
      return [];
    }
    throw error;
  }
};

const writeContactsFile = async (data) => {
  await fs.writeFile(contactsFilePath, JSON.stringify(data, null, 2), "utf-8");
};

const listContacts = async () => {
  contacts = await readContactsFile();
  return contacts;
};

const getContactById = async (contactId) => {
  contacts = await readContactsFile();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  contacts = await readContactsFile();
  contacts = contacts.filter((contact) => contact.id !== contactId);
  await writeContactsFile(contacts);
};

const addContact = async (body) => {
  contacts = await readContactsFile();
  const newContact = { id: Date.now().toString(), ...body };
  contacts.push(newContact);
  await writeContactsFile(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  contacts = await readContactsFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await writeContactsFile(contacts);
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
