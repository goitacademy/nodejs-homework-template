const fs = require('fs/promises')
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./models/contacts.json');

async function listContacts () {
  try {
    return JSON.parse(await fs.readFile(contactsPath, 'utf-8'))
  } catch (err) {
    console.error(err);
  }
}

const getContactById = async (contactId) => {
  try {
    const [contact] = (await listContacts()).filter(obj => obj.id === contactId.toString())
    return contact;
  } catch (err) {
    console.error(err);
  }
}

const removeContact = async (contactId) => {
  try {
    const updatedContacts = (await listContacts()).filter(obj => obj.id !== contactId.toString());
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  } catch (err) {
    console.error(err);
  }
}

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone
    }
    const contacts = await listContacts();
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
    
  } catch (err) {
    console.error(err);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const updatedContact = {
        id: contactId,
        name,
        email,
        phone
    }
    const contacts = await listContacts();
    contacts.map(element => (element.id === contactId.toString()) && Object.assign(element, updatedContact));
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return updatedContact;
    
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}