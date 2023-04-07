const { nanoid } = require('nanoid');
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) {
        return null;
    }
    const result = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
      id: nanoid(),
      name: data.name,
      email: data.email,
      phone: data.phone,       
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact;
}

async function updateContact(id, data) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }
    const updatedContact = Object.assign({}, contacts[index], data);
    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
