const fs = require('fs/promises');
const path = require('path');
const {v4} = require("uuid");

const contactsPath = path.join(__dirname, 'contacts.json');


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === id);
    return contactById;
}
const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone,  }; 
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[idx];
}

const removeContact = async (id) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === id);
    if (idx === -1) {
        return null;
    }
    const [contact] = contacts.splice(idx, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}



module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
