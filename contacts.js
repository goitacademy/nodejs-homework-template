const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.join(__dirname, "./db/contacts.json");
const { v4 } = require("uuid");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const selectContacts = contacts.find(({ id }) => id === +contactId);
    if (!selectContacts) {
      throw new Error(`Product with id=${contactId} not found`);
    }
    console.table(selectContacts);
    return selectContacts;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const idx = contacts.findIndex((item) => item.id === +contactId);
    if (idx === -1) {
      throw new Error(`Product with id=${id} not found`);
    }
    const filterContacts = contacts.filter(({ id }) => id !== +contactId);
    const contactsString = JSON.stringify(filterContacts, null, 2);
    await fs.writeFile(contactsPath, contactsString);
    console.table(filterContacts);
    return contacts[idx];
  } catch (error) {
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    const productsString = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, productsString);
    return newContact;
  } catch (error) {
    throw error;
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
