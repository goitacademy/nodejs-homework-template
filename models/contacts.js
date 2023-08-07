const fs = require("fs/promises");

const path = "./models/contacts.json";

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(path);
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((el) => el.id === contactId);
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const isExist = contacts.find((el) => el.id === contactId);
    if (!isExist) {
      return false;
    } else {
      const newContacts = contacts.filter((el) => el.id !== contactId);
      fs.writeFile(path, JSON.stringify(newContacts, null, 2));
      return true;
    }
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    contacts.push(body);
    await fs.writeFile(path, JSON.stringify(contacts, null, 2));
    return body;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((el) => el.id === contactId);
    if (!contact) {
      return false;
    } else {
      contact.name = body.name;
      contact.email = body.email;
      contact.phone = body.phone;
    }
    fs.writeFile(path, JSON.stringify(contacts, null, 2));
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
