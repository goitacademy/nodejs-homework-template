const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById =
      contacts.find((contact) => contact.id === contactId) || null;
    return contactById;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
