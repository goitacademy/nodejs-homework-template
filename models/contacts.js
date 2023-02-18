// const fs = require('fs/promises')
const path = require("path");
const fs = require("fs").promises;
const { uuid } = require('uuidv4');


const contactsPath = path.join(__dirname, "contacts.json");

async function wrightDb(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, -2));
}

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const allContacts = JSON.parse(data);
    return allContacts;

  } catch (error) {
    console.error(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contactById = allContacts.find(contact => contact.id === contactId);
    if (!contactId) {
      return console.log(`contact with ID: ${contactId} NOT FOUND!!! `)
    }  
    return contactById;
  } catch (error) {
    console.error(error);
  }
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
