const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve(__dirname, "..", "db", "contacts.json");
console.log("contactsPath", contactsPath);

const getContacts = async () => {
  try {
    const rawData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (id) => {
  try {
    const listContacts = await getContacts();
    return listContacts.find((contact) => String(contact.id) === String(id));
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (id) => {
  try {
    const listContacts = await getContacts();
    const newContList = listContacts.filter(
      (contact) => String(contact.id) !== String(id)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContList, null, 2));
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const id = crypto.randomUUID();
    const listContacts = await getContacts();
    const newContact = { id, ...body };
    listContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(listContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (id, body) => {
  try {
    const listContacts = await getContacts();
    const idx = listContacts.findIndex((contact) => contact.id === id);
    if (idx === -1) {
      return null;
    }
    listContacts[idx] = { id, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(listContacts, null, 2));
    return listContacts[idx];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
