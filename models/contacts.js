const fs = require('fs/promises');
const path = require('path');
const {nanoid}  = require("nanoid");

const contactsPath = path.resolve("./models/contacts.json"); 

const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

async function listContacts() {
  try {
    const getContacts = await fs.readFile(contactsPath);
    return JSON.parse(getContacts)
  } catch (error) {
    console.log(error)
  }
}
async function getContactById(contactId) {
  try {
    const getId = await listContacts();
    return getId.find(item => item.id === contactId) || null;
  } catch (error) {
    console.log(error)
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
  } catch (error) {
    console.log(error)
  }
}

async function addContact({name, email, phone}) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name, 
      email,
      phone,
    }
    contacts.push(newContact)
    await updateContacts(contacts);
  } catch (error) {
    console.log(error)
  }
}

async function updateContact(id, data) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);

    if (index === -1) {
      return null;
    }

    contacts[index] = { id, ...data };
    await updateContacts(contacts);

    return contacts[index];

  } catch (error) {
      console.log(error)
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};