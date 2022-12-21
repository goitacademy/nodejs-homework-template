const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./contacts.json');

const listContacts = async function () {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const getContact = async function (id) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parsedData = JSON.parse(data);
    const result = parsedData.filter(obj => {
      return obj.id === id;
    });
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

const addContact = async function (name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parsedData = JSON.parse(data);
    const newContent = { id: uuidv4(), name, email, phone };
    parsedData.push(newContent);
    await fs.writeFile(contactsPath, JSON.stringify(parsedData), 'utf8');
  } catch (err) {
    console.error(err);
  }
};
const removeContact = async function (id) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parsedData = JSON.parse(data);
    const result = parsedData.filter(obj => {
      return obj.id !== id;
    });
    await fs.writeFile(contactsPath, JSON.stringify(result), 'utf8');
  } catch (err) {
    console.error(err);
  }
};
const updateContact = async (contactId, body) => {};
module.exports = {
  listContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
};
