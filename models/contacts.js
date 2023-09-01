const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    return JSON.parse(fs.readFileSync(contactsPath));
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(contactsPath));
    const selectedId = contacts.find((el) => el.id === contactId);
    return selectedId;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(contactsPath));
    const indexToRemove = contacts.findIndex((el) => el.id === contactId);
    console.log(indexToRemove);
    if (indexToRemove === -1) {
      return;
    }
    contacts.splice(indexToRemove, 1);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(contactsPath));
    const { name, email, phone } = body;
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(contactsPath));
    const contactToUpdate = contacts.find((el) => el.id === contactId);
    const { name, email, phone } = body;
    contactToUpdate.name = name || contactToUpdate.name;
    contactToUpdate.email = email || contactToUpdate.email;
    contactToUpdate.phone = phone || contactToUpdate.phone;

    fs.writeFileSync(contactsPath, JSON.stringify(contacts));
    return contacts;
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
