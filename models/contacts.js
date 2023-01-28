const fs = require("fs/promises");
const path = require("path");
const { v4: idContacts } = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const getContact = contacts.find((item) => item.id === contactId);
    if (!getContact) {
      return null;
    }
    return getContact;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const addContact = {
      id: idContacts(),
      ...body,
    };
    contacts.push(addContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    await fs.readFile(contactsPath, "utf-8");
    return addContact;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const contact = contacts.filter((item) => {
      return item.id !== contactId;
    });
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    await fs.readFile(contactsPath, "utf-8");
    return contacts[idx];
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const contactsIndex = allContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactsIndex === -1) {
      return null;
    }
    allContacts[contactsIndex] = { id: contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts[contactsIndex];
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
