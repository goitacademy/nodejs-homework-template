const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.log('The contacts list loaded successfully');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error getting the contacts list', err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    console.log('The contact is loaded successfully');
    return result || null;
  } catch (err) {
    console.error('Error getting a contact', err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);

    if (index === -1) return null;

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('The contact was removed successfully');
    return result;
  } catch (err) {
    console.error('Error removing a contact', err);
  }
}

async function addContact(name, email, phone) {
  try {
    const { nanoid } = await import('nanoid');
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('New contact was added successfully');
    return newContact;
  } catch (err) {
    console.error('Error adding a contact', err);
  }
}

async function updateContact(contactId, body) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id: contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
