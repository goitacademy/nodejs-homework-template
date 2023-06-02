const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

async function getContacts() {
    const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts);
  };
  
async function getContactById(contactId) {
    const allContacts = await getContacts();
    const oneContact = allContacts.find(contact => contact.id === contactId);
    return oneContact || null ;
  };
  
async function removeContact(contactId) {
    const allContacts = await getContacts();
    const deletedContactIndex = allContacts.findIndex(contact => contact.id === contactId);
    if(deletedContactIndex === -1) {
      return null;
    };
    const deletedContact = allContacts[deletedContactIndex];
    const newContactsList = allContacts.filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));
    return deletedContact;
  };
  
  async function addContact({name, email, phone}) {
    const allContacts = await getContacts();
    const newContact = { id: nanoid(), name, email, phone };
    allContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  };

module.exports = {
    getContacts,
    getContactById,
    removeContact,
    addContact
}
