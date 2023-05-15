const fs = require("fs/promises")
const path = require("path")
const { nanoid } = require("nanoid")

const contactsPath = path.join(__dirname, "contacts.json");

  async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  }

  async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(user => user.id === contactId);
    return contact|| null
  }
    
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const selectedContact = contacts.findIndex(user => user.id === contactId);
    if(selectedContact === -1){
        return null;
    }
    const removeUser = contacts.splice(selectedContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removeUser;
  }
  
  async function addContact(body) {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), ...body }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

  const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { ...contacts[index], ...body };
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
 