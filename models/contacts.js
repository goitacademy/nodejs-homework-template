const fs = require('fs/promises')
const path = require('path');
const {nanoid} = require("nanoid");

const contactsPath = path.resolve('models/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;  
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const result = await listContacts();
    const contactToFind = result.find(
      contact => contact.id === contactId
    )
    return contactToFind;  
  } catch (error) {
    console.log(error);
  }
}

const addContact = async (body) => {
  try {
    const result = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body
    }
    result.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(result));
    return newContact;  
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const result = await listContacts();
    const indexOfContactID = result.findIndex(
      contact => contact.id === contactId
    );
    if (indexOfContactID === -1) {
      return null;
    }
    const deletedContact = result.splice(indexOfContactID, 1);
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return deletedContact;  
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const result = await listContacts();
    const index = result.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    result[index] = {contactId, ...body};
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return result[index];
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
