const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "./contacts.json");

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
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    return parseData.filter(({ id }) => id === contactId);
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    const filterData = parseData.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filterData));
    if (filterData.length === parseData.length) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    const newData = [...parseData, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newData));
    return newContact;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await fs.readFile(contactsPath);
  const parseData = JSON.parse(data);
  const newData = [...parseData];
  let status = null;
  newData.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      status = true;
    }
  });
  if (status) {
    await fs.writeFile(contactsPath, JSON.stringify(newData));
    const data = await fs.readFile(contactsPath);
    const updatedContact = JSON.parse(data).filter(
      (contact) => contact.id === contactId
    );
    return { status, updatedContact };
  }
  status = false;
  return status;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
