const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts.filter((contact) => contact.id === contactId.toString());
  } catch (err) {
    throw new Error(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newData = JSON.stringify(
      contacts.filter((contact) => contact.id !== contactId.toString())
    );
    await fs.writeFile(contactsPath, newData, "utf-8");
    return contacts.filter((contact) => contact.id === contactId.toString());
  } catch (err) {
    throw new Error(err.message);
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    contacts.push({
      id: (Number(contacts[contacts.length - 1].id) + 1).toString(),
      ...body,
    });
    const newData = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, newData, "utf-8");
    return contacts[contacts.length - 1];
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    contacts.forEach((contact, index) => {
      if (contact.id === contactId.toString()) {
        contacts[index] = { ...contact, ...body };
      }
    });
    const newData = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, newData, "utf-8");
    return contacts.filter((contact) => contact.id === contactId.toString());
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
