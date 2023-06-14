const fs = require("fs/promises");
const path = require("node:path");

const contactsPath = `${path.dirname("./db/contacts.json")}/${path.basename(
  "./db/contacts.json"
)}`;

const { Contact } = require("../models/contacts.js");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = JSON.parse(data);

    const contact = parsedData.find((contact) => contact.id === contactId);
    return contact;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = JSON.parse(data);

    const lastElement = parsedData.slice(-1);
    const newId = Number(lastElement[0].id) + 1;
    const stringifiedNewId = JSON.stringify(newId);

    const contact = new Contact(
      stringifiedNewId,
      body.name,
      body.email,
      body.phone
    );

    const updatedContacts = [...parsedData];
    updatedContacts.push(contact);

    const stringifiedUpdatedContacts = JSON.stringify(updatedContacts);

    await fs.writeFile(contactsPath, stringifiedUpdatedContacts);

    return contact;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = JSON.parse(data);

    const contactIndex = parsedData.findIndex(
      (contact) => contact.id === contactId
    );

    const updatedContacts = [...parsedData];

    updatedContacts.splice(contactIndex, 1);
    const stringifiedUpdatedContacts = JSON.stringify(updatedContacts);

    await fs.writeFile(contactsPath, stringifiedUpdatedContacts);

    return parsedData;
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = JSON.parse(data);

    const contactIndex = parsedData.findIndex(
      (contact) => contact.id === contactId
    );

    const updatedContact = {
      id: parsedData[contactIndex].id,
      ...body,
    };

    const updatedContacts = [...parsedData];

    updatedContacts.splice(contactIndex, 1, updatedContact);
    const stringifiedUpdatedContacts = JSON.stringify(updatedContacts);

    await fs.writeFile(contactsPath, stringifiedUpdatedContacts);

    return updatedContact;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};