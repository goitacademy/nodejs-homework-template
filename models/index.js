const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

async function updateContacts(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    throw error;
  }
}

async function listContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getById(id) {
  try {
    const contact = JSON.parse(await fs.readFile(contactsPath, "utf-8")).find(
      (contact) => contact.id === id
    );
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
}

async function updateContact(id, name, email, phone) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === id);
    if (!contact) {
      return null;
    }
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    await updateContacts(contacts);
    return contact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(id) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return removedContact;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
