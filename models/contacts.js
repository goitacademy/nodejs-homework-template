const fs = require ("fs/promises");
const {nanoid} = require ("nanoid");
const path = require ("path");

const contactsPath = path.join(__dirname, "/contacts.json");

async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}
  
async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
}
  
async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result || null;
}
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };