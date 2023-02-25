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
      return null;
    }  
    return contactById;
  } catch (error) {
    console.error(error);
  }
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await wrightDb(allContacts);
  return result
}

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: uuid(), ...body,
  }
  allContacts.push(newContact)
  await wrightDb(allContacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId);
  if (index === -1) { return null }
  
  allContacts[index] = { contactId, ...body }
  await wrightDb(allContacts);
  return allContacts[index];

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
