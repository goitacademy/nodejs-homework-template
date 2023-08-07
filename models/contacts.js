const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    const contact = contacts.find((c) => c.id === contactId);

    return contact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    console.log("Received data:", body); // Dodaj ten log
    const contacts = await listContacts();
    const newContact = { ...body, id: Date.now().toString() };
    console.log("New contact:", newContact); // Dodaj ten log
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.map((c) =>
      c.id === contactId ? { ...c, ...body, id: contactId } : c
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    const updatedContact = updatedContacts.find((c) => c.id === contactId);
    return updatedContact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
