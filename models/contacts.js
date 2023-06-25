const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function withErrorHandling(callback) {
  try {
    return await callback();
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}

async function listContacts() {
  return withErrorHandling(async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.log(data);
    return JSON.parse(data);
  });
}

async function getContactById(contactId) {
  return withErrorHandling(async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId) || null;
  });
}

async function removeContact(contactId) {
  return withErrorHandling(async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactToRemove = contacts.find((contact) => contact.id === contactId);

    if (!contactToRemove) {
      return null;
    }

    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), "utf-8");

    return contactToRemove;
  });
}

async function addContact(name, email, phone) {
  return withErrorHandling(async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");

    return newContact;
  });
}

async function updateContact(contactId, updatedFields) {
  return withErrorHandling(async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const contactToUpdate = contacts.find((contact) => contact.id === contactId);

    if (!contactToUpdate) {
      return null;
    }

    const updatedContact = {
      ...contactToUpdate,
      ...updatedFields,
    };

    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId ? updatedContact : contact
    );

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), "utf-8");

    return updatedContact;
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
