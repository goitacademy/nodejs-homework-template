const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const contactData = parsedData.find((item) => item.id === contactId);
    return contactData;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const index = parsedData.findIndex((contact) => contact.id === contactId);
    const contact = parsedData[index];

    if (index !== -1) {
      parsedData.splice(index, 1);
      const newData = JSON.stringify(parsedData);
      await fs.writeFile(contactsPath, newData);
      return contact;
    }
    return false;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const id = uuidv4();
    const newContact = { id, name, email, phone };
    const newData = JSON.stringify([...parsedData, newContact]);
    await fs.writeFile(contactsPath, newData);
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const index = parsedData.findIndex((contact) => contact.id === contactId);
    const contact = parsedData[index];
    if (index !== -1) {
      parsedData.splice(index, 1, { ...contact, ...body });
      const newData = JSON.stringify(parsedData);
      await fs.writeFile(contactsPath, newData);
      return parsedData[index];
    }
    return false;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
