const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');
const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath);
    console.table(JSON.parse(result));
    return JSON.parse(result);
  } catch (error) {
    throw new Error('not found');
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    if (!contact) throw new Error('not found');
    return contact;
  } catch (error) {
    throw new Error('not found');
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(value => value.id === contactId);
    if (index === -1) return null;
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return index;
  } catch (error) {
    throw new Error('not found');
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const contact = { id: shortid.generate(), name, email, phone };
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
  } catch (error) {
    throw new Error('not found');
  }
}

async function updateContact(contactId, body) {
  try {
    const { name, number, email } = body;
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) throw new Error('not found');
    contacts[index] = { id: contactId, name, number, email };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    throw new Error('not found');
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact };
