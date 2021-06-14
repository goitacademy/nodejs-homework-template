const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

async function listContacts() {
  try {
    const contactList = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contactList);
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter(contact => contact.id === Number(contactId));
    return contactById;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContactList = contacts.filter(contact => contact.id !== Number(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), 'utf8' );
    return newContactList;
  } catch (error) {
    throw error;
  }
}

async function addContact({name, email, phone}) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone}
    const newContactList = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), 'utf8' );
    return newContactList;
  } catch (error) {
    throw error;
  }
}


const updateContact = async (contactId, body) => {
  try {
    const initialContact = await getContactById(contactId);
    const contactsList = await listContacts();
    const updatedContact = { ...initialContact, ...body };
    const updatedContactList = contactsList.map(contact =>
      contact.id === Number(contactId) ? updatedContact : contact
    );
    await fs.writeFile(contacts, JSON.stringify(updatedContactList), 'utf8');
    return updatedContact;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
