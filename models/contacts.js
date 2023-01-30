const fs = require('fs/promises');
const path = require("path"); 
const {v4} = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    if (!result){
        return null;
    }
    return result;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if(idx === -1){
        return null;
    };
    const [removeContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removeContact; 
}

const addContact = async (name, email, phone) => { 
    const contacts = await listContacts();
    const newContact = {name, email, phone, id:v4()};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}


const updateContact = async (id, body) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    };
    contacts[idx] = {...body, id};
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
