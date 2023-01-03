// const fs = require("fs").promises;
// const path = require("path");
// const contactsPath = path.resolve("./models/contacts.json");
const { Contact } = require("../db/contactModel");
const listContacts = async (owner) => {
  const data = await Contact.find({ owner });

  return data;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  const contactById = parsedData.find((contact) => contact.id === contactId);
  console.table(contactById);
  return contactById;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  const contactById = parsedData.filter((contact) => contact.id !== contactId);
  console.table(contactById);
  return contactById;
};

const addContact = async (name, email, phone) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  const id = Math.random().toString();
  parsedData.push({ id, name, email, phone });
  const jsonNewData = JSON.stringify(parsedData);
  fs.writeFile(contactsPath, jsonNewData);
  return jsonNewData;
};

const updateContact = async (contactId, name, email, phone) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  parsedData.forEach((contact) => {
    if (contact.id === contactId) {
      contact.id = contactId;
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });
  const jsonNewData = JSON.stringify(parsedData);
  fs.writeFile(contactsPath, jsonNewData);
  return jsonNewData;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
