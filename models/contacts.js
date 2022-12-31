const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async function () {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return data;
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
    return result;
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
    return JSON.stringify(newContent.id);
  } catch (err) {
    console.error(err);
  }
};
const removeContact = async function (id) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parsedData = JSON.parse(data);
    const result = parsedData.find(obj => {
      return obj.id === id;
    });
    if (result) {
      const newResult = parsedData.filter(obj => {
        return obj.id !== id;
      });
      await fs.writeFile(contactsPath, JSON.stringify(newResult), 'utf8');
      return newResult;
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};
const updateContact = async (id, body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const parsedData = JSON.parse(data);
    const newState = parsedData.map(obj => (obj.id === id ? body : obj));
    await fs.writeFile(contactsPath, JSON.stringify(newState), 'utf8');
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  listContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
};
