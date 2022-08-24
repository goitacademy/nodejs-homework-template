const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const contactsDataString = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contactsDataString);
  } catch (err) {
    console.error(err.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      (contact) => contact.id.toString() === contactId
    );
    if (!contact) {
      return null;
    }
    return contact;
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(
      (contact) => contact.id.toString() === contactId
    );
    if (idx === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };