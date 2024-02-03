const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "../", "db", "contacts.json");

async function readContactsFile() {
  const contactsData = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contactsData);
}

async function writeContactsFile(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf-8");
}

async function listContacts() {
  try {
    return await readContactsFile();
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contactsJson = await readContactsFile();
    return contactsJson.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contactsJson = await readContactsFile();
    const contactToRemove = contactsJson.find(
      (contact) => contact.id === contactId
    );
    if (!contactToRemove) return null;

    const updatedContacts = contactsJson.filter(
      (contact) => contact.id !== contactId
    );
    await writeContactsFile(updatedContacts);
    return 1;
  } catch (error) {
    throw error;
  }
}
async function addContact(contactData) {
  try {
    const id = nanoid();
    const newContact = {
      id,
      ...contactData,
    };
    const contactsJson = await readContactsFile();
    const updatedContacts = [...contactsJson, newContact];
    await writeContactsFile(updatedContacts);
    return newContact;
  } catch (error) {
    throw error;
  }
}
async function upDateContact(id, updatedData) {
  try {
    const contactsJson = await readContactsFile();
    const contactIndex = contactsJson.findIndex((contact) => contact.id === id);
    if (contactIndex === -1) return null;

    const updatedContacts = contactsJson.map((contact, index) =>
      index === contactIndex ? { ...contact, ...updatedData } : contact
    );
    await writeContactsFile(updatedContacts);
    return updatedContacts[contactIndex];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  upDateContact,
};
