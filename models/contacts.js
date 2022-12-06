const { readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  try {
    const data = await readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(
      (contact) => contact.id === String(contactId)
    );
    if (!contactById) {
      return;
    }
    return contactById;
  } catch (err) {
    console.error(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => contact.id === String(contactId)
    );
    if (index === -1) {
      return null;
    }
    const [deletedContact] = contacts.splice(index, 1);
    await writeFile(contactsPath, JSON.stringify(contacts));
    return deletedContact;
  } catch (err) {
    console.error(err.message);
  }
};

const addContact = async (body) => {
  try {
    const { id, name, email, phone } = body;
    const contacts = await listContacts();
    const newContact = {
      id,
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    await writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.error(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => contact.id === String(contactId)
    );

    if (index === -1) {
      return null;
    }

    contacts[index] = { ...contacts[index], ...body };

    await writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
