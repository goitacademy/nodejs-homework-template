// const { log } = require('console');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');


const contactsPath = path.resolve('./models/contacts.json');


const readContacts = async () => { 
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts
  } catch (error) {
    console.error(error);
  }
}

const listContacts = async () => {
  try {
    const contactList = await readContacts();
    // console.table(contactList);
    return contactList;
  } catch (error) {
    console.error(error);
  }
}
// listContacts();
const getContactById = async (contactId) => {
  try {
    const contacts = await readContacts();
    const foundContact = contacts.find(el => String(el.id) === String(contactId));
    if (foundContact) {
      return foundContact;
    } 
    // console.log('not found');
    return null;
  } catch (error) {
    console.error(error);
  }
}
// getContactById(12);

const removeContact = async (contactId) => {
  try {
    const contacts = await readContacts();
    const deletedContact = contacts.find(el => String(el.id) === String(contactId));
    if (deletedContact) {
      const newContacts = contacts.filter(el => String(el.id) !== String(contactId));
      await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8');
      // console.log('deleted :', deletedContact);
      return deletedContact;
    }
      // console.log('not found');
      return null;
  } catch (error) {
    console.error(error);
  }
}
// removeContact(10);

const addContact = async (body) => {
    try {
      const contacts = await readContacts();
      // body.name - body.email - body.phone
      const newContact = { id: uuidv4(), ...body };
      // console.log(newContact);
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return newContact;
    } catch (error) {
      console.error(error);
    }
}

// const testContact = { "name": "TEST NAME", "email": "TEST EMAIL", "phone": "TEST PHONE" };
// addContact(testContact);

const updateContact = async (contactId, body) => {
  try {
  const contacts = await readContacts();
  const index = contacts.findIndex(
      (contact) => String(contact.id) === String(contactId)
    );

  if (index !== -1) {
      // contacts[index] = { ...contacts[index], ...body };
      contacts[index] = { id: contacts[index].id, ...body };
      await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');
      return contacts[index];
    }
    return null;
  } catch (error) {
      console.error(error);
  }

}
// const testContact = { "name": "TEST NAME", "email": "TEST EMAIL" };
// updateContact(1, testContact);

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
