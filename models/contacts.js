const fs = require('fs/promises')
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '/contacts.json');

const listContacts = async () => {  
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  
}

const getContactById = async(contactId) => {    
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId.toString());
    return contact || null;       
   
}

const removeContact = async(contactId)=> { 
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => {
      return id === contactId.toString();
    });
    if (index === -1) {
      return null;
    }
    const [removedContacts] = contacts.splice(index, 1);  
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContacts;
  
}

const addContact = async({name, email, phone}) => {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateContact = async (id, body) => {
    const normId = String(id);
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === normId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id, ...body };
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
