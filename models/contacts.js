const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "./contacts.json");


const listContacts = async () => {
  try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        // error => console.log(error.message) 
  }
}

const getContactById = async (contactId) => {
      try {
        const contacts = await listContacts();
        const contact = contacts.find(contact => contact.id === contactId.toString());
        return contact;
    } catch (error) {
        // error => console.log(error.message) 
    } 
    
}

const removeContact = async (contactId) => {
  try {
        const contacts = await listContacts();
        const contactIndex = contacts.findIndex(contact => contact.id === contactId.toString())
        if (contactIndex === -1) {
            return null;
        }

        const newContactList = contacts.filter(contact => contact.id !== contactId.toString());
        await fs.writeFile(contactsPath, JSON.stringify(newContactList));
        return contacts[contactIndex];
    } catch (error) {
        // error => console.log(error.message) 
  }
}

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;    
            const contactList = await listContacts();
            const newContact = {
                id: uuidv4(),
                name,
                email,
                phone
            }
            contactList.push(newContact);
            await fs.writeFile(contactsPath, JSON.stringify(contactList));
            return newContact;

    } catch (error) {
        // error => console.log(error.message) 
  }
}

const updateContact = async (contactId, body) => {
  try {
      const { name, email, phone } = body;    
     
        const contacts = await listContacts();
        const contactIndex = contacts.findIndex(contact => contact.id === contactId.toString())
        if (contactIndex === -1) {
            return null;
        }

        const newContactList = contacts.filter(contact => contact.id !== contactId.toString());
        await fs.writeFile(contactsPath, JSON.stringify(newContactList));
        return contacts[contactIndex];
    } catch (error) {
        // error => console.log(error.message) 
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
