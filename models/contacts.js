const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
// const { v4: uuid } = require('uuid');

const contactsPath = path.resolve(__dirname, '../models/contacts.json');

async function readContacts() {
  const contacts = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(contacts);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');
}

async function getContacts() {
  try {
    return readContacts();
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact || null;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContacts();
    const updateContacts = contacts.filter(contact => contact.id !== contactId);
    await writeContacts(updateContacts);
    const indexRemovedContact = contacts.findIndex(
      contact => contact.id === contactId
    );
    if (indexRemovedContact === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(indexRemovedContact, 1);
    return removedContact;
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    // const id = uuid();
    const id = nanoid();

    const newContact = { id, name, email, phone };
    const contacts = await readContacts();
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
  } catch (err) {
    console.error(err);
  }
}

async function updateContact(contactId, body) {
  try {
    const contacts = await readContacts();
    const indexUpdatedContact = contacts.findIndex(
      contact => contact.id === contactId
    );

    if (indexUpdatedContact === -1) {
      return null;
    }

    contacts[indexUpdatedContact] = { id: contactId, ...body };
    await writeContacts(contacts);

    return contacts[indexUpdatedContact];
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
