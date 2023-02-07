const fs = require('fs/promises')
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data) || null;
}

const getContactById = async (contactId) => {
    const data = await listContacts();
    const result = data.find(
      (contact) => contact.id === String(contactId)
    );
    return result;
}

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const result = data.filter(
      (contact) => contact.id !== String(contactId)
    );
    console.log("data.length: ", data.length, "result.length: ", result.length);
    if (data.length === result.length) {
      return false;
    }
    fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return true;
  } catch (error) {
    return error;
  }
}

const addContact = async (body) => {
  try {
    const data = await listContacts();
    const newContact = {
      id: uniqid(),
      ...body,
    };
    const updateData = [...data, newContact];
    fs.writeFile(contactsPath, JSON.stringify(updateData, null, 2));
    return newContact;
  } catch (error) {
    return error;
  }
}

const updateContact = async (contactId, body) => {
  try {
    let data = await listContacts();
    const index = data.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const updateContact = {
      ...data[index],
      ...body,
    };
    data.splice(index, 1, updateContact);
    fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return updateContact;
  } catch (error) {
    return error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
