const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    return list;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const contact = list.filter(({ id }) => id === contactId);
    return contact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const contact = list.find(({ id }) => id === contactId);
    if (!contact) {
      return;
    }
    const newList = JSON.stringify(list.filter(({ id }) => id !== contactId));

    await fs.writeFile(contactsPath, newList);
    return newList;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const newList = JSON.stringify([...list, newContact]);
    await fs.writeFile(contactsPath, newList);
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const index = list.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      return;
    }
    const contact = { id: contactId, ...body };
    list.splice(index, 1, contact);
    await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8");

    return contact;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
