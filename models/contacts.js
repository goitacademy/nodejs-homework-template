const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const filePath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(filePath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(filePath, "utf-8");
    const contact = JSON.parse(contacts).find(({ id }) => contactId === id);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(filePath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const contact = parsedContacts.find(({ id }) => contactId === id);
    if (!contact) {
      return null;
    }
    const updatedContacts = parsedContacts.filter(({ id }) => id !== contactId);
    fs.writeFile(filePath, JSON.stringify(updatedContacts), "utf-8");
    return updatedContacts;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const newContact = { id: v4(), name, email, phone };
    const contacts = await fs.readFile(filePath, "utf-8");
    const updatedContacts = [...JSON.parse(contacts), newContact];
    fs.writeFile(filePath, JSON.stringify(updatedContacts), "utf-8");
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await fs.readFile(filePath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const [contact] = parsedContacts.filter(({ id }) => id === contactId);
    if (!contact) {
      return null;
    }
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    const updatedContacts = [...parsedContacts, contact];
    fs.writeFile(filePath, JSON.stringify(updatedContacts), "utf-8");
    return contact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};