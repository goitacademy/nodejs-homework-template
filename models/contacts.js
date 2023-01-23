const fs = require('fs/promises')
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./models/contacts.json');

async function listContacts () {
  try {
    return Object.values(JSON.parse(await fs.readFile(contactsPath, 'utf-8')))
  } catch (err) {
    console.error(err);
  }
}

const getContactById = async (contactId) => {
  try {
    return Object.values(JSON.parse(await fs.readFile(contactsPath, 'utf-8'))).filter(obj => obj.id === contactId.toString());
  } catch (err) {
    console.error(err);
  }
}

const removeContact = async (contactId) => {
  try {
    let contacts = Object.values(JSON.parse(await fs.readFile(contactsPath, 'utf-8')))
    contacts = contacts.filter(obj => obj.id !== contactId.toString());
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (err) {
    console.error(err);
  }
}

const addContact = async (body) => {
  try {
    const newContact = {
        'id': uuidv4(),
        'name': body.name,
        'email': body.email,
        'phone': body.phone
    }

    let contacts = JSON.parse(await fs.readFile(contactsPath, 'utf-8'))
    contacts = [...Object.values(contacts), newContact];
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
    
  } catch (err) {
    console.error(err);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = Object.values(JSON.parse(await fs.readFile(contactsPath, 'utf-8')))
    contacts.forEach(element => {
      if(element.id === contactId.toString()) {
        (body.name) && (element.name = body.name);
        (body.email) && (element.email = body.email);
        (body.phone) && (element.phone = body.phone);
      }});
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts.find(element => element.id === contactId.toString());
    
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